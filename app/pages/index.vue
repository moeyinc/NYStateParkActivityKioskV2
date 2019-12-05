<template>
  <div class="home-page">
    <HomeHeader />
    <HomeActivityList />
  </div>
</template>

<script>
import HomeHeader from '@comps/home/HomeHeader';
import HomeActivityList from '@comps/home/HomeActivityList';

export default {
  transition: 'fade',
  components: {
    HomeHeader,
    HomeActivityList,
  },
};
</script>

<style scoped lang="stylus">
</style>
