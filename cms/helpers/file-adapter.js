const { MEDIA_DIR, MEDIA_URL } = require('../config');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

module.exports = {
  localFileAdapter: new LocalFileAdapter({
    path: MEDIA_URL,
    src: '.' + MEDIA_DIR,
  }),
};
