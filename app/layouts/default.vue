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
import { mapState, mapActions } from 'vuex';
import rippleMixin from '@/mixins/ripple-mixin';

export default {
  mixins: [rippleMixin],
  data: () => ({
    pollingTimer: null,
  }),
  computed: {
    ...mapState(['generalSettings']),
    isDev () {
      return process.env.dev;
    },
  },
  mounted () {
    this.startPolling();
  },
  destroyed () {
    this.stopPolling();
  },
  methods: {
    ...mapActions(['fetchActivities']),
    startPolling () {
      console.log('generalSettings', this.generalSettings);
      const timeout = this.generalSettings && this.generalSettings.pollingIntervalInMinutes
        ? this.generalSettings.pollingIntervalInMinutes * 60 * 1000
        : 10 * 60 * 1000;
      this.pollingTimer = setInterval(() => {
        this.fetchActivities();
        console.log('polling activities', timeout);
      }, timeout);
    },
    stopPolling () {
      clearInterval(this.pollingTimer);
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
