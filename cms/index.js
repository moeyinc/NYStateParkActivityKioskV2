const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { SETUP, PROJECT_NAME } = require('./config');
const { userListConfig } = require('./schema/user');
const { generalSettingListConfig, generalSettingPresets } = require('./schema/general-setting');
const { colorListConfig, colorPresets } = require('./schema/color');
const { activityListConfig, activityPresets } = require('./schema/activity');
const { mediaListConfig } = require('./schema/media');
const { tabItemListConfig } = require('./schema/tab-item');

console.log('my port is', process.env.PORT);

// create a keystone instance
const keystone = new Keystone({
  name: PROJECT_NAME,
  secureCookies: false,
  adapter: new Adapter(),
  onConnect: seedData,
});

// create schemas
keystone.createList('User', userListConfig);
keystone.createList('Activity', activityListConfig);
keystone.createList('GeneralSetting', generalSettingListConfig);
keystone.createList('Medium', mediaListConfig);
keystone.createList('Color', colorListConfig);
keystone.createList('TabItem', tabItemListConfig);

// add initial data to DB after connected to it
function seedData() {
  if (SETUP) {
    console.log('\n[SETUP] Seeding initial data for MOEY Activity Kiosk... ' + SETUP);
  }
  if (SETUP === 'all' || SETUP === 'general') keystone.executeQuery(mutationFactory('GeneralSettings', generalSettingPresets));
  if (SETUP === 'all' || SETUP === 'activities') keystone.executeQuery(mutationFactory('Activities', activityPresets));
  if (SETUP === 'all' || SETUP === 'colors') keystone.executeQuery(mutationFactory('Colors', colorPresets));

  function mutationFactory(listNamePlural, dataQuery) {
    return `mutation { create${listNamePlural}(data: ${dataQuery}) {id} }`;
  }
}

// set up authentication strategy
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

// run GraphQL app, AdminUI app, and media server app
module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy: !Boolean(SETUP) && authStrategy,
    }),
  ],
};
