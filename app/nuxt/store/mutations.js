export default {
  updateGeneralSettings (state, generalSettings) {
    state.generalSettings = generalSettings;
  },
  updateActivities (state, activities) {
    state.activities = activities;
    state.selectedActivityId = activities[0].id;
  },
  updateActivityColors (state, activityColors) {
    state.activityColors = activityColors;
  },
  selectActivity (state, id) {
    state.selectedActivityId = id;
  },
  updateIsFirstSideNavItemActive (state, value) {
    state.isFirstSideNavItemActive = value;
  },
};
