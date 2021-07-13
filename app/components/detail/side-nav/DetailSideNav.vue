<template>
  <nav class="detail-side-nav">
    <DetailSideNavActivityList />
    <div
      class="home-button"
      @click="$router.push('/')"
    >
      <ArrowButton
        :color="generalSettings.textColor"
        :size="20"
        direction="left"
      />
      <div class="text">
        {{ isSpanishEnabled ? 'MENÚ' : 'MAIN MENU' }}
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import ArrowButton from '@comps/common/ArrowButton';
import DetailSideNavActivityList from './DetailSideNavActivityList';

export default {
  components: {
    DetailSideNavActivityList,
    ArrowButton,
  },
  computed: {
    ...mapState(['generalSettings', 'isSpanishEnabled']),
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
    bottom: 0
    width: 250px
    height: 70px
    display: flex
    align-items: center
    font-family: $title-font
    font-size: 24px
    padding-left: 20px
    .text
      margin-left: 7px
      padding-top: 3px
</style>
