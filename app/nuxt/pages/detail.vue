<template>
  <div class="detail-page">
    <div class="container">
      <DetailSideNav />
      <DetailMain />
    </div>
  </div>
</template>

<script>
import DetailSideNav from '@comps/detail/side-nav/DetailSideNav';
import DetailMain from '@comps/detail/DetailMain';

export default {
  components: {
    DetailSideNav,
    DetailMain,
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
