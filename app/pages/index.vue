<template>
  <div
    v-if="generalSettings && activities && activityColors"
    class="home-page"
  >
    <HomeHeader />
    <HomeActivityList />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HomeHeader from '@comps/home/HomeHeader';
import HomeActivityList from '@comps/home/HomeActivityList';
import pageAsyncDataMixin from '@/mixins/page-async-data-mixin';

export default {
  components: {
    HomeHeader,
    HomeActivityList,
  },
  mixins: [pageAsyncDataMixin],
  transition: 'fade',
  computed: {
    ...mapState(['generalSettings', 'activities', 'activityColors']),
  },
};
</script>

<style scoped lang="stylus">
</style>
