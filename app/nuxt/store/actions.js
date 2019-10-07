import { generalSettings, activities } from '@/test-data';

export default {
  fetchGeneralSettings ({ commit }) {
    commit('updateGeneralSettings', generalSettings);
  },
  fetchActivities ({ commit }) {
    commit('updateActivities', activities);
  },
};
