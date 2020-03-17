# NYStateParkActivityKioskV2

## Initial Setup
1. Install latest node+npm and mongodb
2. setup media server with ```cd media-server && npm install```
3. add a .env file like below
```bash
PORT=3020
MEDIA_DIR="../cms/media"
```
4. In another terminal window, setup cms with ```cd cms && npm install```
5. add a .env file like below
```bash
PORT=8011
MEDIA_DIR="./media"
MEDIA_SERVER_API_URL="http://localhost:3020/media"
PROJECT_NAME="MOEY ACTIVITY KIOSK CMS"
```
6. ```npm run dev:setup-all```, then open localhost:8011, login to the CMS and create an admin user
7. logout, and ```npm run dev```
8. In another terminal window, setup kiosk app with ```cd app && npm install```
9. add a .env file like below
```bash
PORT=3000
API_URL="http://localhost:8011/admin/api"
MEDIA_SERVER_API_URL="http://localhost:3020/media"
```
10. ```npm run dev``` and open localhost:3000
11. then start setting content in CMS. You can find sample media files at /sample-assets

## Build apps for local environment
1. At cms/ Build Keystone app by ```npm run build```
2. At app/ Build Electron app by ```npm run electron:build```
3. Start Keystone app by ```npm run start```
4. Start Electron app by ```npm run electron```

## Build apps for cloud environment
1. At cms/ Build Keystone app by ```npm run build```
2. At app/ Build Nuxt app by ```npm run build```
3. Start Keystone app by ```npm run start```
4. Start Nuxt app by ```npm run start```
