<template>
  <nav class="detail-side-nav">
    <DetailSideNavActivityList />
    <div
      @click="$router.push('/')"
      class="home-button"
    >
      <div
        :style="triangleStyle"
        class="triangle-left"
      />
      <div class="text">
        MAIN MENU
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import DetailSideNavActivityList from './DetailSideNavActivityList';

export default {
  components: {
    DetailSideNavActivityList,
  },
  computed: {
    ...mapState(['generalSettings']),
    triangleStyle () {
      return {
        backgroundColor: this.generalSettings.textColor,
      };
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/fonts'

.detail-side-nav
  position: absolute
  top: 0
  left: 0
  bottom: 0
  width: 250px
  .home-button
    position: absolute
    bottom: 5px
    width: 250px
    height: 50px
    display: flex
    align-items: center
    font-family: $title-font
    font-size: 24px
    padding-left: 30px
    .text
      margin-left: 15px
      padding-bottom: 4px
    .triangle-left, .triangle-left:before, .triangle-left:after
      width:  0.8em
      height: 0.8em
      border-top-right-radius: 30%
    .triangle-left:before, .triangle-left:after
      content: ''
      position: absolute
      background-color: inherit
    .triangle-left
      position: relative
      transform: rotate(90deg) skewX(-30deg) scale(1,.866)
      &:before
        transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%)
      &:after
        transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%)
</style>
