<template>
  <div class="detail-main-page-wrapper">
    <div class="top-left-gap-filler" :style="topLeftGapFillerStyle" />
    <div class="detail-main-page" :style="pageStyle">
      page
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedTab: {
      type: Object,
      default: null,
    },
    isFirstTabSelected: {
      type: Boolean,
      default: false,
    },
    mainColor: {
      type: String,
      default: '',
    },
    subColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    topLeftGapFillerStyle () {
      return {
        backgroundColor: this.subColor,
      };
    },
    pageStyle () {
      return {
        borderRadius: this.isFirstTabSelected ? '0 20px 20px 20px' : '20px',
      };
    },
  },
};
</script>

<style scoped lang="stylus">
.detail-main-page-wrapper
  height: 752px
  position: relative
  .top-left-gap-filler
    position: absolute
    width: 20px
    height: 20px
  .detail-main-page
    z-index: 100
    position: absolute
    width: 100%
    height: 100%
    background-color: white
    border-radius: 20px
    padding: 20px
</style>
