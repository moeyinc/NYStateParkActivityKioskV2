<template>
  <div
    v-if="generalSettings && activities && activityColors"
    class="detail-page"
    @click="resetTimer"
  >
    <div class="container">
      <DetailSideNav />
      <DetailMainContainer />
    </div>
    <LanguageToggleButton
      v-if="showLanguageToggleButton"
      class="language-toggle-button"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import DetailSideNav from '@comps/detail/side-nav/DetailSideNav';
import DetailMainContainer from '@comps/detail/DetailMainContainer';
import LanguageToggleButton from '@comps/common/LanguageToggleButton';
import pageAsyncDataMixin from '@/mixins/page-async-data-mixin';

export default {
  components: {
    DetailSideNav,
    DetailMainContainer,
    LanguageToggleButton,
  },
  mixins: [pageAsyncDataMixin],
  transition: 'fade',
  data: () => ({
    screenTimer: null,
  }),
  computed: {
    ...mapState(['generalSettings', 'activities', 'activityColors']),
    showLanguageToggleButton () {
      return this.generalSettings.showLanguageToggleButton;
    },
  },
  created () {
    this.resetTimer();
  },
  beforeDestroy () {
    clearTimeout(this.screenTimer);
  },
  methods: {
    ...mapMutations(['updateIsSpanishEnabled']),
    resetTimer () {
      clearTimeout(this.screenTimer);
      const timeout = this.generalSettings && this.generalSettings.screenTimeoutInSeconds
        ? this.generalSettings.screenTimeoutInSeconds * 1000
        : 300 * 1000;
      this.screenTimer = setTimeout(() => {
        this.$router.push('/');
        this.updateIsSpanishEnabled(false);
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
  .language-toggle-button
    position: absolute
    top: 68px
    right: 60px
    z-index: 100
</style>
