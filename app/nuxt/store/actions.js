// import { activities } from '@/test-data';

export default {
  fetchGeneralSettings ({ commit }) {
    this.$axios.post('/', {
      query: `
        query {
          allGeneralSettings(where:{active: true}, first:1) {
            id
            presetName
            backgroundColor
            textColor
            kioskTitle
            hideParkLogo
            screenTimeoutInSeconds
          }
        }
      `,
    }).then((res) => {
      const generalSettings = res.data.data.allGeneralSettings[0];
      commit('updateGeneralSettings', generalSettings);
    });
  },
  fetchActivityColors ({ commit }) {
    this.$axios.post('/', {
      query: `
        query {
          allColors {
            id
            order
            mainColor
            subColor
          }
        }
      `,
    }).then((res) => {
      const activityColors = res.data.data.allColors.sort(sortByOrder);
      commit('updateActivityColors', activityColors);
    });
  },
  fetchActivities ({ commit }) {
    this.$axios.post('/', {
      query: `
        query {
          allActivities(where: {enabled: true}) {
            id
            order
            buttonLabel
            pageTitle
            svgIcon {
              id
              publicUrl
              path
              mimetype
              filename
              originalFilename
            }
          }
        }
      `,
    }).then((res) => {
      const activities = res.data.data.allActivities.sort(sortByOrder);
      commit('updateActivities', activities);
    });
  },
};

function sortByOrder (a, b) {
  if (typeof a.order !== 'number' || typeof b.order !== 'number') return 0;
  if (a.order < b.order) {
    return 1;
  } else if (a.order > b.order) {
    return -1;
  } else {
    return 0;
  }
}
