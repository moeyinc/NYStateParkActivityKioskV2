export default {
  updateGeneralSettings (state, generalSettings) {
    state.generalSettings = generalSettings;
  },
  updateActivities (state, activities) {
    state.activities = activities;
    state.selectedActivityId = activities[0].id;
  },
  selectActivity (state, id) {
    state.selectedActivityId = id;
  },
};
