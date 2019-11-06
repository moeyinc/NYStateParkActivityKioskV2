<template>
  <div class="side-nav-activity-list">
    <DetailSideNavActivityListItem
      v-for="(activity, index) in activities"
      :key="activity.id"
      :activity="activity"
      :first-tab="index === 0"
      :selected="activity.id === selectedActivityId"
      @click="selectActivity(activity.id)"
    />
  </div>
</template>

<script>
import DetailSideNavActivityListItem from '@comps/detail/DetailSideNavActivityListItem';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    DetailSideNavActivityListItem,
  },
  computed: {
    ...mapState(['activities', 'selectedActivityId']),
  },
  methods: {
    ...mapMutations(['selectActivity']),
  },
};
</script>

<style scoped lang="stylus">
</style>
