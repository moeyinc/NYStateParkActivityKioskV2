const path = require('path');
const { MEDIA_DIR, MEDIA_SERVER_API_URL } = require('../config');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

module.exports = {
  localFileAdapter: new LocalFileAdapter({
    path: MEDIA_SERVER_API_URL,
    src: path.join('./', MEDIA_DIR),
  }),
};
