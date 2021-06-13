const { ENABLE_SPANISH_SUPPORT } = require('../config');
const { localFileAdapter } = require('../helpers/file-adapter');
const { Text, File } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const config = {
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
      defaultColumns: 'updatedAt, createdAt',
      defaultSort: 'updatedAt',
    },
    plugins: [
      atTracking(),
    ],
  },
};

if (ENABLE_SPANISH_SUPPORT) {
  config.mediaListConfig.fields.nameInSpanish = { type: Text };
  config.mediaListConfig.fields.captionInSpanish = { type: Text };
}

module.exports = config;
