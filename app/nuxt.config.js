const fs = require('fs');
const path = require('path');
require('dotenv').config();
const GENERATIVE_SW_SCRIPT_NAME = 'sw.custom.js';

module.exports = {
  ssr: false,
  target: 'static',
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
      swURL: GENERATIVE_SW_SCRIPT_NAME,
    },
  },
  hooks: {
    build: {
      before: (builder) => {
        const templateFilePath = path.join(builder.nuxt.options.srcDir, 'hooks', `template.${GENERATIVE_SW_SCRIPT_NAME}`);
        let template = fs.readFileSync(templateFilePath, { encoding: 'utf8' });
        const API_URL = removeSlashAtEnd(process.env.API_URL);
        const MEDIA_SERVER_API_URL = removeSlashAtEnd(process.env.MEDIA_SERVER_API_URL);
        const swScript = template.replace('__API_URL__', API_URL).replace('__MEDIA_SERVER_API_URL__', MEDIA_SERVER_API_URL);
        const swScriptFilePath = path.join(builder.nuxt.options.srcDir, 'static', GENERATIVE_SW_SCRIPT_NAME);
        fs.writeFileSync(swScriptFilePath, swScript, { encoding: 'utf8' });
      },
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

/*
 * removeSlashAtEnd
 * @return {!String} URL without slash at the end
 */
function removeSlashAtEnd (url) {
  return url.substr(-1) === '/' ? url.slice(0, -1) : url;
}
