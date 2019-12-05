<template>
  <div
    @click="resetTimer"
    class="detail-page"
  >
    <div class="container">
      <DetailSideNav />
      <DetailMainContainer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DetailSideNav from '@comps/detail/side-nav/DetailSideNav';
import DetailMainContainer from '@comps/detail/DetailMainContainer';

export default {
  transition: 'fade',
  components: {
    DetailSideNav,
    DetailMainContainer,
  },
  data: () => ({
    screenTimer: null,
  }),
  computed: {
    ...mapState(['generalSettings']),
  },
  created () {
    this.resetTimer();
  },
  beforeDestroy () {
    clearTimeout(this.screenTimer);
  },
  methods: {
    resetTimer () {
      clearTimeout(this.screenTimer);
      const timeout = this.generalSettings.screenTimeoutInSeconds * 1000 || 300 * 1000;
      this.screenTimer = setTimeout(() => {
        this.$router.push('/');
      }, timeout);
    },
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
