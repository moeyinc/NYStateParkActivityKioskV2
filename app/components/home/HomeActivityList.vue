<template>
  <div class="home-activity-list">
    <div class="container">
      <HomeActivityListItem
        v-for="(activity, index) in activities"
        :key="activity.id"
        :label="activity.buttonLabel"
        :icon-url="activity.svgIcon && activity.svgIcon.publicUrl"
        :main-color="activityColors[index] && activityColors[index].mainColor"
        :button-width="buttonWidth"
        :button-height="buttonHeight"
        :button-margin="buttonMargin"
        @click="onActivityButtonClick(activity.id)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import HomeActivityListItem from './HomeActivityListItem';

export default {
  components: {
    HomeActivityListItem,
  },
  computed: {
    ...mapState(['activities', 'activityColors']),
    buttonWidth () {
      switch (this.activities.length) {
        case 15:
        case 14:
        case 13:
          return 342;
        case 12:
        case 11:
        case 10:
        case 8:
        case 7:
          return 405;
        case 9:
        case 6:
        case 5:
        case 3:
          return 460;
        case 4:
          return 580;
        default:
          return 0;
      }
    },
    buttonHeight () {
      switch (this.activities.length) {
        case 15:
        case 14:
        case 13:
        case 12:
        case 11:
        case 10:
        case 9:
          return 234;
        case 8:
        case 7:
        case 6:
        case 5:
        case 4:
          return 330;
        case 3:
          return 460;
        default:
          return 0;
      }
    },
    buttonMargin () {
      if (this.activities.length >= 13) {
        return '15px 14px';
      } else {
        return '15px 20px';
      }
    },
  },
  methods: {
    ...mapMutations(['selectActivity']),
    onActivityButtonClick (activityId) {
      this.selectActivity(activityId);
      this.$router.push('/detail');
    },
  },
};
</script>

<style scoped lang="stylus">
.home-activity-list
  height: 854px
  padding: 31px 35px
  .container
    height: 100%
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-content: center
</style>
