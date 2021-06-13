const { ENABLE_SPANISH_SUPPORT } = require('../config');
const { Text, Checkbox, Relationship, Integer } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { atTracking } = require('@keystonejs/list-plugins');

const config = {
  tabItemListConfig: {
    fields: {
      activity: {
        type: Relationship,
        ref: 'Activity.tabItems',
        isRequired: true,
      },
      tabLabel: { type: Text, isRequired: true },
      order: { type: Integer, isRequired: true },
      enabled: { type: Checkbox, defaultValue: true },
      tabWidth: { type: Integer, defaultValue: 370 },
      primaryHeaderImage: {
        type: Relationship,
        ref: 'Medium',
        label: 'Primary Header Image (optional) -- If set, a large image will be displayed at the top',
      },
      subHeaderImage: {
        type: Relationship,
        ref: 'Medium',
        label: 'Sub Header Image (optional) -- If both the primary and sub header images are set, two large images will be displayed at the top',
      },
      content: {
        type: Wysiwyg,
        label: 'Content -- to insert an image, set the source as ../../media/[image-filename-found-in-the-Media-entry]',
      },
      isGallery: { type: Checkbox },
      galleryImages: {
        type: Relationship,
        ref: 'Medium',
        many: true,
      },
      activityLabel: {
        type: Text,
        access: {
          read: true,
          create: false,
          update: false,
        },
        hooks: {
          // Possible cases of how tabItem.activity value can change
          // A -> A: remain the same, with a value set
          // X -> X: remain the same, with no value set
          // A -> X: unset the value
          // X -> A: set a new value to null
          // A -> B: set a different value
          resolveInput: ({ existingItem, resolvedData, actions }) => {
            // console.log('--------------------------');
            // console.log('resolvedData:', resolvedData);
            // console.log('existingItem', existingItem);

            // A -> A, X -> X
            // If there's no need to update tabItem.activityLabel, just return
            if (resolvedData.activity === undefined) {
              // console.log('A -> A or X -> X');
              return;
            }

            // A -> X
            // If the relationship is just unset, return an empty string
            if (resolvedData.activity === null) {
              // console.log('A -> X');
              return '';
            }

            return new Promise((resolve, reject) => {
              const existingActivityId = existingItem && existingItem.activity && existingItem.activity.toString();
              const resolvedActivityId = resolvedData.activity && resolvedData.activity.toString();

              if (!existingActivityId) {
                // console.log('X -> A');
                // X -> A
                // If this is setting a new relationship with an activity,
                // set the activity's buttonLabel as this tabItem.activityLabel
                getActivityLabel(resolvedActivityId)
                  .then((result) => {
                    const activityLabel = result.data.allActivities[0].buttonLabel;
                    resolve(activityLabel);
                  });
              } else if (existingActivityId !== resolvedActivityId) {
                // console.log('A -> B');
                // A -> B
                // If the existing relationship is being replaced with the one to another activity,
                // disconnect the existing relationship from an activity to this tab,
                // then set the activity's buttonLabel as this tabItem.activityLabel
                const tabId = existingItem.id;
                disconnectTabItemFromOldActivity(tabId, existingActivityId)
                  .then(() => getActivityLabel(resolvedActivityId))
                  .then((result) => {
                    const activityLabel = result.data.allActivities[0].buttonLabel;
                    resolve(activityLabel);
                  });
              } else if (existingActivityId === resolvedActivityId) {
                // A -> A, X -> X
                // console.log('A -> A or X -> X #2');
                getActivityLabel(resolvedActivityId)
                  .then((result) => {
                    const activityLabel = result.data.allActivities[0].buttonLabel;
                    resolve(activityLabel);
                  });
              } else {
                // console.log('others');
                resolve();
              }

              async function disconnectTabItemFromOldActivity (tabId, existingActivityId) {
                return actions.query(`mutation { updateActivity(id: "${existingActivityId}", data: { tabItems: { disconnect: { id: "${tabId}" } } }) { id } }`);
              }

              async function getActivityLabel (resolvedActivityId) {
                return actions.query(`query { allActivities(where: { id: "${resolvedActivityId}" }) { buttonLabel } }`);
              }
            });
          },
        },
      },
    },
    labelResolver: (item) => {
      if (!item.activityLabel) {
        return item.tabLabel;
      } else {
        return `${item.tabLabel} (Activity: ${item.activityLabel})`;
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

if (ENABLE_SPANISH_SUPPORT) {
  config.tabItemListConfig.fields.tabLabelInSpanish = { type: Text };
  config.tabItemListConfig.fields.contentInSpanish = {
    type: Wysiwyg,
    label: 'Content in Spanish -- to insert an image, set the source as ../../media/[image-filename-found-in-the-Media-entry]',
  };
}

module.exports = config;
