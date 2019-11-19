<template>
  <nav class="detail-side-nav">
    <DetailSideNavActivityList />
  </nav>
</template>

<script>
import DetailSideNavActivityList from './DetailSideNavActivityList';

export default {
  components: {
    DetailSideNavActivityList,
  },
};
</script>

<style scoped lang="stylus">
.detail-side-nav
  position: absolute
  top: 0
  left: 0
  bottom: 0
  width: 250px
</style>
