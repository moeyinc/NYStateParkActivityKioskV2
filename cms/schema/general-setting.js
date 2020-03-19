const { SETUP } = require('../config');
const access = require('../helpers/access-control');
const { Text, Checkbox, Color, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  generalSettingListConfig: {
    fields: {
      presetName: { type: Text },
      active: { type: Checkbox },
      backgroundColor: { type: Color },
      textColor: { type: Color },
      kioskTitle: { type: Text },
      hideParkLogo: { type: Checkbox },
      screenTimeoutInSeconds: { type: Integer },
      pollingIntervalInMinutes: { type: Integer, defaultValue: 10 },
    },
    labelField: 'presetName',
    adminConfig: {
      defaultColumns: 'presetName, active, updatedAt',
      defaultSort: 'presetName',
    },
    access: {
      read: true,
      update: Boolean(SETUP) || access.userIsAdmin,
      create: Boolean(SETUP) || access.userIsAdmin,
      delete: Boolean(SETUP) || access.userIsAdmin,
      auth: !Boolean(SETUP),
    },
    plugins: [
      atTracking(),
    ],
  },
  generalSettingPresets: `[
    {
      data: {
        presetName: "default",
        active: true,
        backgroundColor: "rgba(255, 231, 204, 1)",
        textColor: "rgba(10, 60, 91, 1)",
        kioskTitle: "THINGS TO DO",
        hideParkLogo: false,
        screenTimeoutInSeconds: 300,
        pollingIntervalInMinutes: 10,
      }
    }
  ]`,
};
