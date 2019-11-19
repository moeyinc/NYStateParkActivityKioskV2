<template>
  <main>
    <div :style="topLeftGapFillerStyle" class="top-left-gap-filler" />
    <div :style="baseStyle" class="base">
      <DetailMainTitle
        :title="selectedActivity.pageTitle"
        :icon-url="selectedActivity.svgIcon && selectedActivity.svgIcon.publicUrl"
      />
      <DetailMainTabList
        v-if="selectedActivity.tabItems"
        :tabs="selectedActivity.tabItems"
        :main-color="selectedActivityColor.mainColor"
        :sub-color="selectedActivityColor.subColor"
        :selected-tab-index="selectedTabIndex"
        @select-tab="(index) => selectedTabIndex = index"
      />
      <DetailMainPage
        v-if="false"
        :selected-tab="selectedActivity.tabItems[selectedTabIndex]"
        :is-first-tab-selected="selectedTabIndex === 0"
        :main-color="selectedActivityColor.mainColor"
        :sub-color="selectedActivityColor.subColor"
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
    ...mapState(['activities', 'selectedActivityId', 'activityColors']),
    ...mapGetters(['selectedActivity', 'selectedActivityColor']),
    isFirstActivitySelected () {
      return this.activities[0].id === this.selectedActivityId;
    },
    topLeftGapFillerStyle () {
      return {
        backgroundColor: this.selectedActivityColor.mainColor,
      };
    },
    baseStyle () {
      return {
        backgroundColor: this.selectedActivityColor.mainColor,
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
