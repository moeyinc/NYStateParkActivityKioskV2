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
        buttonLabel: "HIKING",
        pageTitle: "HIKING"
      },
    },
    {
      data: {
        order: 2,
        buttonLabel: "BIKING",
        pageTitle: "BIKING"
      },
    },
    {
      data: {
        order: 3,
        buttonLabel: "ROCK CLIMBING",
        pageTitle: "ROCK CLIMBING"
      },
    },
    {
      data: {
        order: 4,
        buttonLabel: "PICNIC SHELTER",
        pageTitle: "PICNIC SHELTER"
      },
    },
    {
      data: {
        order: 5,
        buttonLabel: "CAMPGROUND",
        pageTitle: "CAMPGROUND"
      },
    },
    {
      data: {
        order: 6,
        buttonLabel: "BIRDING",
        pageTitle: "BIRDING"
      },
    },
    {
      data: {
        order: 7,
        buttonLabel: "FISHING",
        pageTitle: "FISHING"
      },
    },
    {
      data: {
        order: 8,
        buttonLabel: "DISC GOLF",
        pageTitle: "DISC GOLF"
      },
    },
    {
      data: {
        order: 9,
        buttonLabel: "WINTER ACTIVITIES",
        pageTitle: "WINTER ACTIVITIES"
      },
    },
    {
      data: {
        order: 10,
        buttonLabel: "GEOCACHING",
        pageTitle: "GEOCACHING"
      },
    },
    {
      data: {
        order: 11,
        buttonLabel: "PLAYGROUNDS",
        pageTitle: "PLAYGROUNDS"
      },
    },
    {
      data: {
        order: 12,
        buttonLabel: "FOOD",
        pageTitle: "FOOD"
      },
    },
    {
      data: {
        order: 13,
        buttonLabel: "EVENT SPACE",
        pageTitle: "EVENT SPACE"
      },
    },
    {
      data: {
        order: 14,
        buttonLabel: "PROGRAMS & EVENTS",
        pageTitle: "PROGRAMS & EVENTS"
      },
    },
    {
      data: {
        order: 15,
        buttonLabel: "NATURE CENTER",
        pageTitle: "NATURE CENTER"
      }
    }
  ]`,
};
