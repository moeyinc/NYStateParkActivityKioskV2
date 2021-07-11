<template>
  <div
    v-if="generalSettings && activities && activityColors"
    class="home-page"
  >
    <HomeHeader />
    <HomeActivityList />
    <LanguageToggleButton
      v-if="showLanguageToggleButton"
      class="language-toggle-button"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HomeHeader from '@comps/home/HomeHeader';
import HomeActivityList from '@comps/home/HomeActivityList';
import LanguageToggleButton from '@comps/common/LanguageToggleButton';
import pageAsyncDataMixin from '@/mixins/page-async-data-mixin';

export default {
  components: {
    HomeHeader,
    HomeActivityList,
    LanguageToggleButton,
  },
  mixins: [pageAsyncDataMixin],
  transition: 'fade',
  computed: {
    ...mapState(['generalSettings', 'activities', 'activityColors']),
    showLanguageToggleButton () {
      return this.generalSettings.showLanguageToggleButton;
    },
  },
};
</script>

<style scoped lang="stylus">
.home-page
  .language-toggle-button
    position: absolute
    top: 68px
    right: 60px
    z-index: 100
</style>
