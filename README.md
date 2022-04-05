# NYStateParkActivityKioskV2

## Update log
### V2.2
- Added dual-language feature. When the keystone is initialized with `ENABLE_SPANISH_SUPPORT=true`, you'll see additional fields in the admin UI and a toggle button in the kiosk app.

### V2.1
- Decoupled cms, nuxt-app, and media-server. Removed all interdependent codes and made all ports and domains manageable with .env files (cms requires package.json to change port)
- Added offline support. The frontend caches static files and media assets and stores API responses as JSON in IndexdDB, and if it's offline it loads data from them instead of trying to throwing HTTP requests.
- Updated readme (this) to set up applications for local and cloud installs
- Added utility scripts to imoprt / export MongoDB data
- new-feature: polling every 10 minitues (configurable) to check if there's change on activity data
- new-feature: add a flag to enable / disable cursor display
- bug-fix: activities' order was not sorted based on their order values

## Architecture Overview
There are three key components: kiosk-app, CMS, media-server. Users can access the kiosk app via a web browser (or a desktop app generated with Electron), and the kiosk app loads content data from CMS and media files from media-server. Each of the servers (kiosk-app, cms, media-server) can be hosted on premises or in cloud.

1. kiosk-app
Kiosk app is responsible for serving the user interface to users. We use Nuxt.js for building and serving the single page application. There are only two pages: home (index) and detail. Home screen displays the list of activities available in/around the park with large buttons. Detail screen displays the detail of each activity with tabs UI. Each activity can show up to 4 tabs in which you can show an article or an image gallery for the activity.
The new content data is fetched from CMS either when a page is loaded or every 10 minutes via polling (configurable).
The demensions are currently fixed to 1920x1080, hense the touchscreen monitor to display this kiosk app should have the same dimensions. Also the hardware should handle the mouse click emulation to properly trigger mouse events in the kiosk app.

2. CMS
CMS is responsible for serving the content data to the kiosk app and providing a GUI to manage the data with the administrators. We use a headless CMS framework called Keystone.js, which can generate a GraphQL API server and the Admin UI based on schema files (schema for activity entries, tab items, media files, etc) we pass to it. We store all data in MongoDB, except for media files (icons, images, etc) which are stored under cms/media directory by default.

3. media-server
Media server is responsible for serving the media files such as icons, images, etc. It's a simple Express.js server that provides an API endpoint for kiosk-app to get media files from a specified directory. This component could be integrated to CMS if we find a good configuration for keystone.js to do so.

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
4. for client-side rendering only, also run ```npm run generate```
5. ```npm run start``` or  ```npm run electron```

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
3. if you need the dual language mode, add `ENABLE_SPANISH_SUPPORT=true` to the .env file

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
server {
  server_name [your-domain];
  client_max_body_size 20M;
  
  location / {
    proxy_pass http://localhost:3000;
  }
  location /media {
    proxy_pass http://localhost:3001;
  }
  location /admin {
    proxy_pass http://localhost:3002;
  }
}
```

## How to create a new SVG icon for an activity
The icon uses my open source library "vue-simple-svg" <https://github.com/seiyable/vue-simple-svg> that supports loading a SVG image file as an inline SVG and allows you to easily change its color and switch between different sources.
To create a new icon compatible with this Activity Kiosk, follow this step below.
1. Find an SVG icon online (I often used a website called "The Noun Project") or create a new vector-based icon and export it as an SVG image.
2. Open it with a text editor and remove unnecessary elements. And add classes of "fill-to-change" or "stroke-to-change" to the elements whose color you want to change when a user selects its button. Looking at the sample icons should help you understand where to add classes. [Reference](https://github.com/moeyinc/NYStateParkActivityKioskV2/blob/master/sample-assets/icons/hiking.svg?short_path=e04af6d)
3. Upload the SVG file via CMS and test if its color changes in the way you expected. If you don't want to test in a production environment, use a demo site or local environment.
