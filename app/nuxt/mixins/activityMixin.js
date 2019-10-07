export default {
  computed: {
    activityButtonLabel () {
      return this.activity.buttonLabel;
    },
    activityPageTitle () {
      return this.activity.pageTitle;
    },
    activityMainColor () {
      return this.activity.mainColor.hex;
    },
    activitySubColor () {
      return this.activity.subColor.hex;
    },
    activityIconFilename () {
      return this.activity.iconFilename;
    },
    activityTabItems () {
      return this.activity.tabItems;
    },
  },
};
