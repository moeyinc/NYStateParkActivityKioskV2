const { Text, Checkbox, Relationship, Integer } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { MEDIA_URL } = require('../config');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  tabItemListConfig: {
    fields: {
      enabled: { type: Checkbox, defaultValue: true },
      order: { type: Integer, isRequired: true },
      tabLabel: { type: Text, isRequired: true },
      activity: {
        type: Relationship,
        ref: 'Activity.tabItems',
        isRequired: true,
      },
      activityLabel: {
        type: Text,
        access: {
          read: true,
          create: false,
          update: false,
        },
        hooks: {
          resolveInput: ({ existingItem, resolvedData, actions }) => {
            if (resolvedData.activityLabel) return;
            if (!resolvedData.activity) return '';
            return new Promise((resolve, reject) => {
              if (existingItem.activity) {
                disconnectTabItemFromOldActivity()
                  .then(setActivityLabel)
                  .then((result) => {
                    const activityLabel = result.data.allActivities[0].buttonLabel;
                    resolve(activityLabel);
                  });
              } else {
                setActivityLabel()
                  .then((result) => {
                    const activityLabel = result.data.allActivities[0].buttonLabel;
                    resolve(activityLabel);
                  });
              }

              // disconnect this tab from the activity that this previously belonged
              async function disconnectTabItemFromOldActivity () {
                const oldActivityId = existingItem.activity.toString();
                const tabId = existingItem.id;
                return actions.query(`mutation { updateActivity(id: "${oldActivityId}", data: { tabItems: { disconnect: { id: "${tabId}" } } }) { id } }`);
              }

              // set activityLabel of the activity related
              async function setActivityLabel () {
                const activityId = resolvedData.activity.toString();
                return actions.query(`query { allActivities(where: { id: "${activityId}" }) { buttonLabel } }`);
              }
            });
          },
        },
      },
      description: {
        type: Wysiwyg,
        label: 'Description -- to insert an image, set the source as ' + MEDIA_URL + '/[image-filename-found-in-the-Media-entry]',
      },
    },
    labelResolver: (item) => {
      if (!item.activityLabel) {
        return `Tab "${item.tabLabel}"`;
      } else {
        return `Tab "${item.tabLabel}" of Activity "${item.activityLabel}"`;
      }
    },
    adminConfig: {
      defaultColumns: 'tabLabel, activityLabel, order, enabled, updatedAt',
      defaultSort: 'updatedAt',
    },
    plugins: [
      atTracking(),
    ],
  },
};
