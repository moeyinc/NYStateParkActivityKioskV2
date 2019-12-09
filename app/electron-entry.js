/*
**  Nuxt
*/
const http = require('http');
const { Nuxt, Builder } = require('nuxt');
let config = require('./nuxt.config.js');
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);
const server = http.createServer(nuxt.render);

let _NUXT_URL_ = '';
if (config.dev) {
  // Build only in dev mode
  builder.build().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

// Listen the server
server.listen();
_NUXT_URL_ = `http://localhost:${server.address().port}`;
console.log(`Nuxt working on ${_NUXT_URL_}`);

/*
** Electron
*/
let win = null; // Current window
const electron = require('electron');
const app = electron.app;
electron.Menu.setApplicationMenu(null);
const newWin = () => {
	win = new electron.BrowserWindow({
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
		webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.removeMenu();
  win.setMenu(null);
  win.setFullScreen(true);
  win.on('closed', () => win = null);

  // Wait for nuxt to build
  const pollServer = () => {
    http
      .get(_NUXT_URL_, (res) => {
      if (res.statusCode === 200) {
        win.loadURL(_NUXT_URL_);
      } else {
        setTimeout(pollServer, 300);
      }
    })
      .on('error', pollServer);
  }
  
	if (config.dev) {
		// Install vue dev tool and open chrome dev tools
		const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');
    installExtension(VUEJS_DEVTOOLS.id)
      .then(name => {
        console.log(`Added Extension:  ${name}`);
        // win.webContents.openDevTools();
      })
      .catch(err => console.log('An error occurred: ', err));

		pollServer();
	} else {
    pollServer();
  }
}
app.on('ready', newWin);
app.on('window-all-closed', () => app.quit());
app.on('activate', () => win === null && newWin());
