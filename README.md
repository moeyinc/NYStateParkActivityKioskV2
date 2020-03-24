# NYStateParkActivityKioskV2

## Prerequisite
- nodejs (>= 10.x) and npm
- mongodb(>= 4.x:)

## Nuxt app
1. ```cd app && npm install```
2. add a .env file like below
```bash
# local install example
PORT=3000
API_URL="http://localhost:3002/admin/api"
MEDIA_SERVER_API_URL="http://localhost:3001/media"
```
```bash
# cloud install example
PORT=3000
API_URL="http://XXXXXXXX.com/admin/api"
MEDIA_SERVER_API_URL="http://XXXXXXXX.com/media"
SHOW_CURSOR=true
```
3. ```npm run build``` or ```npm run electron:build```
4. ```npm run start``` or  ```npm run electron```

## Media server
1. ```cd media-server && npm install```
2. add a .env file like below
```bash
PORT=3001
MEDIA_DIR="../cms/media"
```
3. ```npm run start```

## CMS
1. ```cd cms && npm install```
2. add a .env file like below
```bash
# local install example
PORT=3002
MEDIA_DIR="./media"
MEDIA_SERVER_API_URL="http://localhost:3001/media"
PROJECT_NAME="MOEY ACTIVITY KIOSK CMS"
```
```bash
# cloud install example
PORT=3002
MEDIA_DIR="./media"
MEDIA_SERVER_API_URL="http://XXXXXXXX.com/media"
PROJECT_NAME="MOEY ACTIVITY KIOSK CMS"
```

#### Initialize CMS with new data
- ```npm run dev:setup-all```, then open it in a browser, login to the CMS and create an admin user

#### Import existing data
- use utilities/export-collections.js to export data from the existing db
- use utilities/import-collections.js to import data to the new db
- copy media files to cms/media/

3. ```npm run build```
4. ```npm run start```

## Nginx reverse proxy config example for cloud install
```bash
location / {
  proxy_pass http://localhost:3000;
}
location /media {
  proxy_pass http://localhost:3001;
}
location /admin {
  proxy_pass http://localhost:3002;
}
```
