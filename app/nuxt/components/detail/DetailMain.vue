<template>
  <main>
    <div class="top-left-gap-filler" :style="topLeftGapFillerStyle" />
    <div class="base" :style="baseStyle">
      <DetailMainTitle
        :title="selectedActivity.pageTitle"
        :icon-filename="selectedActivity.iconFilename"
      />
      <DetailMainTabList
        :tabs="selectedActivity.tabItems"
        :main-color="selectedActivity.mainColor.hex"
        :sub-color="selectedActivity.subColor.hex"
        :selected-tab-index="selectedTabIndex"
        @select-tab="(index) => selectedTabIndex = index"
      />
      <DetailMainPage
        :selected-tab="selectedActivity.tabItems[selectedTabIndex]"
        :is-first-tab-selected="selectedTabIndex === 0"
        :main-color="selectedActivity.mainColor.hex"
        :sub-color="selectedActivity.subColor.hex"
      />
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DetailMainTitle from './DetailMainTitle';
import DetailMainTabList from './DetailMainTabList';
import DetailMainPage from './page/DetailMainPage';

export default {
  components: {
    DetailMainTitle,
    DetailMainTabList,
    DetailMainPage,
  },
  data: () => ({
    selectedTabIndex: 0,
  }),
  computed: {
    ...mapState(['activities', 'selectedActivityId']),
    ...mapGetters(['selectedActivity']),
    isFirstActivitySelected () {
      return this.activities[0].id === this.selectedActivityId;
    },
    topLeftGapFillerStyle () {
      return {
        backgroundColor: this.activities[0].mainColor.hex,
      };
    },
    baseStyle () {
      return {
        backgroundColor: this.selectedActivity.mainColor.hex,
        borderRadius: this.isFirstActivitySelected ? '0 20px 20px 20px' : '20px',
      };
    },
  },
};
</script>

<style scoped lang="stylus">
main
  position: absolute
  top: 0
  right: 0
  bottom: 0
  width: 1630px
  .top-left-gap-filler
    position: absolute
    width: 20px
    height: 20px
  .base
    z-index: 100
    position: absolute
    width: 100%
    height: 100%
    padding: 20px
</style>
