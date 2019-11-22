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
      const activityColors = res.data.data.allColors.sort(this.$sortByOrder);
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
            tabItems {
              id
              enabled
              tabLabel
              content
              order
            }
          }
        }
      `,
    }).then((res) => {
      const activities = res.data.data.allActivities.sort(this.$sortByOrder);
      commit('updateActivities', activities);
    });
  },
};
