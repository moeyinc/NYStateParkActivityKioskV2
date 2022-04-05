import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
require('dotenv').config();
const GENERATIVE_SW_SCRIPT_NAME = 'sw.custom.js';


export const ssr = false;
export const server = {
  port: process.env.PORT || 3000
};
export const target = 'static';
export const head = {
  title: 'Activity Kiosk',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'List of activities you can do in/around this park' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ]
};
export const loading = false;
export const css = [
  '@/assets/styles/global.styl',
];
export const plugins = [
  '@/plugins/vue-simple-svg',
  { src: '@/plugins/vue-lightbox', mode: 'client' },
  '@/plugins/inject-utils',
];
export const buildModules = [
  // Doc: https://github.com/nuxt-community/eslint-module
  '@nuxtjs/eslint-module',
];
export const env = {
  MEDIA_URL: process.env.MEDIA_SERVER_API_URL,
  dev: process.env.NODE_ENV === 'development',
  SHOW_CURSOR: process.env.SHOW_CURSOR
};
export const dev = process.env.NODE_ENV === 'development';
export const modules = [
  '@nuxtjs/axios',
  '@nuxtjs/pwa',
];
export const pwa = {
  workbox: {
    swURL: GENERATIVE_SW_SCRIPT_NAME
  }
};
export const hooks = {
  build: {
    before: (builder) => {
      const templateFilePath = join(builder.nuxt.options.srcDir, 'hooks', `template.${GENERATIVE_SW_SCRIPT_NAME}`);
      let template = readFileSync(templateFilePath, { encoding: 'utf8' });
      const API_URL = removeSlashAtEnd(process.env.API_URL);
      const MEDIA_SERVER_API_URL = removeSlashAtEnd(process.env.MEDIA_SERVER_API_URL);
      const swScript = template.replace('__API_URL__', API_URL).replace('__MEDIA_SERVER_API_URL__', MEDIA_SERVER_API_URL);
      const swScriptFilePath = join(builder.nuxt.options.srcDir, 'static', GENERATIVE_SW_SCRIPT_NAME);
      writeFileSync(swScriptFilePath, swScript, { encoding: 'utf8' });
    }
  }
};
export const build = {
  /*
  ** You can extend webpack config here
  */
  extend(config, ctx) {
    // Run ESLint on save
    if (ctx.isDev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
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
          loader: 'vue-svg-loader'
        },
        {
          loader: 'file-loader',
          query: {
            name: 'assets/[name].[hash:8].[ext]'
          }
        },
      ]
    });

    // add aliases
    config.resolve.alias['@styles'] = resolve('assets/styles');
    config.resolve.alias['@images'] = resolve('assets/images');
    config.resolve.alias['@fonts'] = resolve('assets/fonts');
    config.resolve.alias['@comps'] = resolve('components');
    config.resolve.alias['@media'] = resolve('static/media');
  }
};

/*
 * resolve
 * @return {!String} absolute path
 */
function resolve (relPath) {
  return join(__dirname, relPath);
}

/*
 * removeSlashAtEnd
 * @return {!String} URL without slash at the end
 */
function removeSlashAtEnd (url) {
  return url.substr(-1) === '/' ? url.slice(0, -1) : url;
}
