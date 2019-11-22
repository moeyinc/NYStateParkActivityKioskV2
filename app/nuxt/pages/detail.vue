<template>
  <div class="detail-page">
    <div class="container">
      <DetailSideNav />
      <DetailMainContainer />
    </div>
  </div>
</template>

<script>
import DetailSideNav from '@comps/detail/side-nav/DetailSideNav';
import DetailMainContainer from '@comps/detail/DetailMainContainer';

export default {
  components: {
    DetailSideNav,
    DetailMainContainer,
  },
};
</script>

<style scoped lang="stylus">
.detail-page
  padding: 20px
  height: 100%
  .container
    position: relative
    height: 100%
</style>
