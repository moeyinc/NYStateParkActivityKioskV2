<template>
  <div class="side-nav-activity-list">
    <DetailSideNavActivityListItem
      v-for="(activity, index) in activities"
      :key="activity.id"
      :label="activity.buttonLabel"
      :icon-url="activity.svgIcon && activity.svgIcon.publicUrl"
      :main-color="activityColors[index] && activityColors[index].mainColor"
      :first-tab="index === 0"
      :selected="activity.id === selectedActivityId"
      @click="selectActivity(activity.id)"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import DetailSideNavActivityListItem from './DetailSideNavActivityListItem';

export default {
  components: {
    DetailSideNavActivityListItem,
  },
  computed: {
    ...mapState(['activities', 'selectedActivityId', 'activityColors']),
  },
  methods: {
    ...mapMutations(['selectActivity']),
  },
};
</script>

<style scoped lang="stylus">
</style>
