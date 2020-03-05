<template>
  <div
    v-if="generalSettings && activities && activityColors"
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
import pageAsyncDataMixin from '@/mixins/page-async-data-mixin';

export default {
  transition: 'fade',
  components: {
    DetailSideNav,
    DetailMainContainer,
  },
  mixins: [pageAsyncDataMixin],
  data: () => ({
    screenTimer: null,
  }),
  computed: {
    ...mapState(['generalSettings', 'activities', 'activityColors']),
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
      const timeout = this.generalSettings && this.generalSettings.screenTimeoutInSeconds
        ? this.generalSettings.screenTimeoutInSeconds * 1000
        : 300 * 1000;
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
