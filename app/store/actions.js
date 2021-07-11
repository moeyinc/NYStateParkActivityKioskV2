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
      commit('updateGeneralSettings', generalSettings);
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
      commit('updateActivityColors', activityColors);
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
      commit('updateActivities', activities);
    });
  },
};
