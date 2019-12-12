# NYStateParkActivityKioskV2

## Initial Setup
1. Install latest node+npm and mongodb
2. ```cd cms && npm install```
3. ```npm run dev:setup-all```, then open localhost:8011, login to the CMS and create an admin user
4. logout, and ```npm run dev```
5. In another terminal window, ```cd app && npm install```
6. add a .env file like below
```bash
API_URL="http://localhost:8011/admin/api"
MEDIA_URL="http://localhost:8011/media"
```
7. ```npm run dev``` and open localhost:3000
8. then start setting content in CMS. You can find sample media files at /sample-assets

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
