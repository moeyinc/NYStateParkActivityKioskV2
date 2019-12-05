const { SETUP } = require('../config');
const access = require('../helpers/access-control');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
  userListConfig: {
    fields: {
      name: { type: Text },
      email: {
        type: Text,
        isUnique: true,
      },
      isAdmin: {
        type: Checkbox,
        access: {
          update: access.userIsAdmin,
        },
      },
      password: {
        type: Password,
      },
      createdByLabel: {
        type: Text,
        label: 'Created by',
        access: {
          create: false,
        },
      },
    },
    hooks: {
      afterChange: async ({ existingItem, updatedItem, actions }) => {
        // ignore the changes made by this mutation
        if (existingItem && existingItem.createdByLabel) return;

        // setting createdByLabel
        const myId = updatedItem.id.toString();
        const ownerId = updatedItem.createdBy && updatedItem.createdBy.toString();
        if (!ownerId) return;
        const result = await actions.query(`query { allUsers(where: { id: "${ownerId}" }) { name } }`);
        const userName = result.data.allUsers[0].name;
        actions.query(`mutation { updateUser(id: "${myId}", data: { createdByLabel: "${userName}" }) { id } }`);
      },
    },
    labelField: 'name',
    adminConfig: {
      defaultColumns: 'createdAt, createdByLabel, isAdmin',
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
      byTracking(),
    ],
  },
};
