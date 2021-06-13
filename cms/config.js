require('dotenv').config()

module.exports = {
  SETUP: process.env.SETUP,
  MEDIA_DIR: process.env.MEDIA_DIR || './media',
  MEDIA_SERVER_API_URL: process.env.MEDIA_SERVER_API_URL,
  PROJECT_NAME: process.env.PROJECT_NAME || 'MOEY ACTIVITY KIOSK CMS',
  ENABLE_SPANISH_SUPPORT: process.env.ENABLE_SPANISH_SUPPORT === 'true' || false,
};
