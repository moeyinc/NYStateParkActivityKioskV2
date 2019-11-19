export default {
  computed: {
    activityId () {
      return this.activity.id;
    },
    activityButtonLabel () {
      return this.activity.buttonLabel;
    },
    activityPageTitle () {
      return this.activity.pageTitle;
    },
    activityIconUrl () {
      return this.activity.svgIcon.publicUrl;
    },
    activityTabItems () {
      return this.activity.tabItems;
    },
  },
};
