importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

// Set workbox config
workbox.setConfig({
  "debug": false,
});

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim();

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting();

workbox.precaching.cleanupOutdatedCaches();

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('__MEDIA_SERVER_API_URL__/.*'), new workbox.strategies.NetworkFirst ({}), 'GET');
workbox.routing.registerRoute(new RegExp('/_nuxt/'), new workbox.strategies.CacheFirst ({}), 'GET');
workbox.routing.registerRoute(new RegExp('/'), new workbox.strategies.NetworkFirst ({}), 'GET');

// Init indexedDB using idb-keyval, https://github.com/jakearchibald/idb-keyval
const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');

// Workbox with custom handler to use IndexedDB for cache.
workbox.routing.registerRoute(
  new RegExp('__API_URL__(/)?'),
  async ({ event }) => staleWhileRevalidate(event),
  'POST',
);

// Return cached response when possible, and fetch new results from server in
// the background and update the cache.
self.addEventListener('fetch', async (event) => {
  if (event.request.method === 'POST') {
    event.respondWith(staleWhileRevalidate(event));
  }
});

async function staleWhileRevalidate(event) {
  let cachedResponse = await getCache(event.request.clone());
  let fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
  return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
  let serializedHeaders = {};
  for (var entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  let serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request, response) {
  let body = await request.json();
  let id = CryptoJS.MD5(body.query).toString();

  var entry = {
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now()
  };
  idbKeyval.set(id, entry, store);
}

async function getCache(request) {
  let data;
  try {
    let body = await request.json();
    let id = CryptoJS.MD5(body.query).toString();
    data = await idbKeyval.get(id, store);
    if (!data) return null;

    // Check cache max age.
    let cacheControl = request.headers.get('Cache-Control');
    let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      console.log(`Cache expired. Load from API endpoint.`);
      return null;
    }

    console.log(`Load response from cache.`);
    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}

async function getPostKey(request) {
  let body = await request.json();
  return JSON.stringify(body);
}
