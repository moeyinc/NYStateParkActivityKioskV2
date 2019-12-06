<template>
  <div class="home-page">
    <HomeHeader />
    <HomeActivityList />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HomeHeader from '@comps/home/HomeHeader';
import HomeActivityList from '@comps/home/HomeActivityList';

export default {
  transition: 'fade',
  components: {
    HomeHeader,
    HomeActivityList,
  },
  mounted () {
    this.fetchGeneralSettings();
    this.fetchActivities();
    this.fetchActivityColors();
  },
  methods: {
    ...mapActions(['fetchGeneralSettings', 'fetchActivities', 'fetchActivityColors']),
  },
};
</script>

<style scoped lang="stylus">
</style>
