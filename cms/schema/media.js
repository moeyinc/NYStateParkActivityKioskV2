const { localFileAdapter } = require('../helpers/file-adapter');
const { Text, File } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
  mediaListConfig: {
    fields: {
      name: { type: Text },
      file: {
        type: File,
        adapter: localFileAdapter,
        isRequired: true,
      },
      caption: { type: Text },
    },
    singular: 'Media',
    plural: 'Media',
    labelField: 'name',
    adminConfig: {
      defaultColumns: 'createdBy, updatedAt, createdAt',
      defaultSort: 'updatedAt',
    },
    plugins: [
      atTracking(),
      byTracking(),
    ],
  },
};
