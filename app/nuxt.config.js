const path = require('path');
require('dotenv').config();

module.exports = {
  mode: 'universal',
  server: {
    port: process.env.PORT || 3000,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Activity Kiosk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'List of activities you can do in/around this park' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/global.styl',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vue-simple-svg',
    { src: '@/plugins/vue-lightbox', mode: 'client' },
    '@/plugins/inject-utils',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  env: {
    MEDIA_URL: process.env.MEDIA_SERVER_API_URL,
    dev: process.env.NODE_ENV === 'development',
    SHOW_CURSOR: process.env.SHOW_CURSOR,
  },
  dev: process.env.NODE_ENV === 'development',
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  pwa: {
    workbox: {
      importScripts: [
        'custom-sw.js',
      ],
      preCaching: [
        '_nuxt/app.js',
        'app.js',
      ],
      offline: true,
      autoRegister: true,
    },
    manifest: {
      name: 'Please load this service worker!!!',
      lang: 'en-us',
    },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      // use vue-svg-loader for .svg files
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'));
      svgRule.test = /\.(png|jpe?g|gif|webp)$/;
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: 'vue-svg-loader',
          },
          {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      });

      // add aliases
      config.resolve.alias['@styles'] = resolve('assets/styles');
      config.resolve.alias['@images'] = resolve('assets/images');
      config.resolve.alias['@fonts'] = resolve('assets/fonts');
      config.resolve.alias['@comps'] = resolve('components');
      config.resolve.alias['@media'] = resolve('static/media');



      // Extend only webpack config for client-bundle
			// if (process.env.BUILD_TARGET === 'electron' && ctx.isClient) {
      //   config.target = 'electron-renderer';
      // }
    },
  },
};

/*
 * resolve
 * @return {!String} absolute path
 */
function resolve (relPath) {
  return path.join(__dirname, relPath);
}
