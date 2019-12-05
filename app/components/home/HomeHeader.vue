<template>
  <div class="home-header">
    <div class="inner">
      <h1 class="kiosk-title">
        {{ kioskTitle }}
      </h1>
    </div>
    <ParkLogo
      v-if="showParkLogo"
      class="park-logo"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ParkLogo from '@images/park-logo.svg?inline';

export default {
  components: {
    ParkLogo,
  },
  computed: {
    ...mapState(['generalSettings']),
    kioskTitle () {
      return this.generalSettings.kioskTitle;
    },
    showParkLogo () {
      return !this.generalSettings.hideParkLogo;
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/fonts'

.home-header
  position: relative
  height: 226px
  padding: 20px 20px 0 55px
  .inner
    height: 100%
    display: flex
    align-items: center
    h1.kiosk-title
      font-family: $title-font
      font-size: 128px
  .park-logo
    position: absolute
    top: 20px
    right: 20px
    width: 500px
</style>
