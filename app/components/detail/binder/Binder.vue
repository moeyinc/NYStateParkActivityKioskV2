<template>
  <div>
    <BinderTabList
      v-if="selectedActivity.tabItems"
      :tabs="sortedTabItems"
      :main-color="selectedActivityColor.mainColor"
      :sub-color="selectedActivityColor.subColor"
      :selected-tab-index="selectedTabIndex"
      @select-tab="(index) => selectedTabIndex = index"
    />
    <BinderContent
      :selected-tab="selectedTab"
      :is-first-tab-selected="selectedTabIndex === 0"
      :main-color="selectedActivityColor.mainColor"
      :sub-color="selectedActivityColor.subColor"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BinderTabList from './BinderTabList';
import BinderContent from './BinderContent';

export default {
  components: {
    BinderTabList,
    BinderContent,
  },
  data: () => ({
    selectedTabIndex: 0,
  }),
  computed: {
    ...mapGetters(['selectedActivity', 'selectedActivityColor']),
    sortedTabItems () {
      return this.selectedActivity.tabItems.slice().sort(this.$sortByOrder).filter((tab) => tab.enabled);
    },
    selectedTab () {
      return this.sortedTabItems[this.selectedTabIndex];
    },
  },
  watch: {
    selectedActivity () {
      this.selectedTabIndex = 0;
    },
  },
};
</script>
