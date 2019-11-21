const { localFileAdapter } = require('../helpers/file-adapter');
const { Text, Checkbox, File, Integer, Relationship } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  activityListConfig: {
    fields: {
      enabled: { type: Checkbox, defaultValue: true },
      order: { type: Integer, isRequired: true },
      buttonLabel: { type: Text, isRequired: true },
      pageTitle: { type: Text, isRequired: true },
      svgIcon: {
        type: File,
        adapter: localFileAdapter,
      },
      tabItems: {
        type: Relationship,
        ref: 'TabItem.activity',
        many: true,
      },
    },
    labelField: 'buttonLabel',
    adminConfig: {
      defaultColumns: 'buttonLabel, order, enabled, updatedAt',
      defaultSort: 'order',
    },
    plugins: [
      atTracking(),
    ],
  },
  activityPresets: `[
    {
      data: {
        order: 1,
        buttonLabel: "Activity 1",
        pageTitle: "Activity 1"
      },
    },
    {
      data: {
        order: 2,
        buttonLabel: "Activity 2",
        pageTitle: "Activity 2"
      },
    },
    {
      data: {
        order: 3,
        buttonLabel: "Activity 3",
        pageTitle: "Activity 3"
      },
    },
    {
      data: {
        order: 4,
        buttonLabel: "Activity 4",
        pageTitle: "Activity 4"
      },
    },
    {
      data: {
        order: 5,
        buttonLabel: "Activity 5",
        pageTitle: "Activity 5"
      },
    },
    {
      data: {
        order: 6,
        buttonLabel: "Activity 6",
        pageTitle: "Activity 6"
      },
    },
    {
      data: {
        order: 7,
        buttonLabel: "Activity 7",
        pageTitle: "Activity 7"
      },
    },
    {
      data: {
        order: 8,
        buttonLabel: "Activity 8",
        pageTitle: "Activity 8"
      },
    },
    {
      data: {
        order: 9,
        buttonLabel: "Activity 9",
        pageTitle: "Activity 9"
      },
    },
    {
      data: {
        order: 10,
        buttonLabel: "Activity 10",
        pageTitle: "Activity 10"
      },
    },
    {
      data: {
        order: 11,
        buttonLabel: "Activity 11",
        pageTitle: "Activity 11"
      },
    },
    {
      data: {
        order: 12,
        buttonLabel: "Activity 12",
        pageTitle: "Activity 12"
      },
    },
    {
      data: {
        order: 13,
        buttonLabel: "Activity 13",
        pageTitle: "Activity 13"
      },
    },
    {
      data: {
        order: 14,
        buttonLabel: "Activity 14",
        pageTitle: "Activity 14"
      },
    },
    {
      data: {
        order: 15,
        buttonLabel: "Activity 15",
        pageTitle: "Activity 15"
      }
    }
  ]`,
};
