<template>
  <div
    :style="{
      backgroundColor: generalSettings ? generalSettings.backgroundColor : 'black',
      color: generalSettings ? generalSettings.textColor : 'white',
      cursor: isDev ? 'auto' : 'none',
    }"
    @click="displayRipple"
    class="default-layout"
  >
    <nuxt class="page" />
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import { mapState } from 'vuex';
import rippleMixin from '@/mixins/ripple-mixin';

export default {
  mixins: [rippleMixin],
  computed: {
    ...mapState(['generalSettings']),
    isDev () {
      return process.env.dev;
    },
  },
};
</script>

<style scoped lang="stylus">
.default-layout
  width: 1920px
  height: 1080px
  overflow: hidden
  .page
    position: relative
</style>
