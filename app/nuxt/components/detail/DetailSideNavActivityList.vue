<template>
  <div class="side-nav-activity-list">
    <DetailSideNavActivityListItem
      v-for="(activity, index) in activities"
      :key="index"
      :activity="activity"
      :first-tab="index === 0"
    />
  </div>
</template>

<script>
import DetailSideNavActivityListItem from '@comps/detail/DetailSideNavActivityListItem';
import { mapState } from 'vuex';

export default {
  components: {
    DetailSideNavActivityListItem,
  },
  computed: {
    ...mapState(['activities']),
  },
};
</script>

<style scoped lang="stylus">
</style>
