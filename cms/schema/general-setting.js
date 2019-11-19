const { SETUP } = require('../config');
const access = require('../helpers/access-control');
const { Text, Checkbox, Color, Integer, DateTime } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

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
    },
    labelField: 'presetName',
    adminConfig: {
      defaultColumns: 'presetName, active, createdBy, updatedAt',
      defaultSort: 'presetName',
    },
    access: {
      read: true,
      update: Boolean(SETUP) || access.userIsAdminOrOwner,
      create: Boolean(SETUP) || access.userIsAdmin,
      delete: Boolean(SETUP) || access.userIsAdmin,
      auth: !Boolean(SETUP),
    },
    plugins: [
      atTracking(),
      byTracking(),
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
      }
    }
  ]`,
};
