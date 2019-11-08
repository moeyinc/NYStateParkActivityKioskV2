const HOST = 'http://localhost';
const PORT = 8011;
const MEDIA_DIR = '/media';
const PROJECT_NAME = 'MOEY ACTIVITY KIOSK CMS';

module.exports = {
  MEDIA_DIR: MEDIA_DIR,
  ROOT_URL: HOST + ':' + PORT,
  MEDIA_URL: HOST + ':' + PORT + MEDIA_DIR,
  PROJECT_NAME: PROJECT_NAME,
};
