import { sortByOrder } from '@/plugins/inject-utils';

export default {
  fetchGeneralSettings ({ commit }) {
    return this.$axios.post('/', {
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
            pollingIntervalInMinutes
            kioskTitleInSpanish
            showLanguageToggleButton
          }
        }
      `,
    }).then((res) => {
      const generalSettings = res.data.data.allGeneralSettings[0];
      if (typeof window !== 'undefined') {
        console.log('we are running on the client');
        localStorage.removeItem('settings');
        localStorage.setItem('settings', JSON.stringify(generalSettings));
      } else {
        console.log('we are running on the server');
        // const settings = JSON.parse(localStorage.getItem('settings'));
        // commit('updateGeneralSettings', settings);
      }
      commit('updateGeneralSettings', generalSettings);
    })
      .catch((error) => {
        console.log(error);
        const sets = JSON.parse(localStorage.getItem('settings'));
        commit('updateGeneralSettings', sets);
      });
  },
  fetchActivityColors ({ commit }) {
    return this.$axios.post('/', {
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
      if (typeof window !== 'undefined') {
        console.log('we are running on the client');
        localStorage.removeItem('colors');
        localStorage.setItem('colors', JSON.stringify(activityColors));
      } else {
        console.log('we are running on the server');
        // const colors = JSON.parse(localStorage.getItem('colors'));
        // commit('updateActivityColors', colors);
      }
      commit('updateActivityColors', activityColors);
    })
      .catch((error) => {
        console.log(error);
        const cols = JSON.parse(localStorage.getItem('colors'));
        commit('updateActivityColors', cols);
      });
  },
  fetchActivities ({ commit }) {
    return this.$axios.post('/', {
      query: `
        query {
          allActivities(where: {enabled: true}) {
            id
            updatedAt
            order
            buttonLabel
            pageTitle
            svgIcon {
              publicUrl
              filename
            }
            buttonLabelInSpanish
            pageTitleInSpanish
            tabItems {
              id
              updatedAt
              enabled
              tabLabel
              tabWidth
              content
              order
              tabLabelInSpanish
              contentInSpanish
              primaryHeaderImage {
                id
                name
                caption
                file {
                  publicUrl
                  filename
                }
                nameInSpanish
                captionInSpanish
              }
              subHeaderImage {
                id
                name
                caption
                file {
                  publicUrl
                  filename
                }
                nameInSpanish
                captionInSpanish
              }
              isGallery
              galleryImages {
                id
                name
                caption
                file {
                  publicUrl
                  filename
                }
                nameInSpanish
                captionInSpanish
              }
            }
          }
        }
      `,
    }).then((res) => {
      const activities = res.data.data.allActivities.sort(sortByOrder);
      if (typeof window !== 'undefined') {
        console.log('we are running on the client');
        localStorage.removeItem('activities');
        localStorage.setItem('activities', JSON.stringify(activities));
      } else {
        console.log('we are running on the server');
        // const activity = JSON.parse(localStorage.getItem('activities'));
        // commit('updateActivities', activity);
      }
      commit('updateActivities', activities);
    })
      .catch((error) => {
        console.log(error);
        const acts = JSON.parse(localStorage.getItem('activities'));
        commit('updateActivities', acts);
      });
  },
};
