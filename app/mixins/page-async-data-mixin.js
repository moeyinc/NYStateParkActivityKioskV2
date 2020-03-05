export default {
  asyncData ({ store }) {
    if (!store.state.generalSettings || !store.state.activities || !store.state.activityColors) {
      return Promise.all([
        store.dispatch('fetchGeneralSettings'),
        store.dispatch('fetchActivities'),
        store.dispatch('fetchActivityColors'),
      ]);
    }
  },
};
