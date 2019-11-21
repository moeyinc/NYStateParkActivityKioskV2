const { SETUP } = require('../config');
const access = require('../helpers/access-control');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  userListConfig: {
    fields: {
      name: { type: Text },
      email: {
        type: Text,
        isUnique: true,
      },
      isAdmin: { type: Checkbox },
      password: {
        type: Password,
      },
    },
    labelField: 'name',
    adminConfig: {
      defaultColumns: 'createdAt',
      defaultSort: 'name',
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
    ],
  },
};
