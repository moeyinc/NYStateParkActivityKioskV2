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
      :content="content"
      :primary-header-image-url="primaryHeaderImageUrl"
      :sub-header-image-url="subHeaderImageUrl"
      :is-first-tab-selected="selectedTabIndex === 0"
      :main-color="selectedActivityColor.mainColor"
      :sub-color="selectedActivityColor.subColor"
      :text-color="generalSettings.textColor"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    ...mapState(['generalSettings']),
    ...mapGetters(['selectedActivity', 'selectedActivityColor']),
    sortedTabItems () {
      return this.selectedActivity.tabItems.slice().sort(this.$sortByOrder).filter((tab) => tab.enabled);
    },
    selectedTab () {
      return this.sortedTabItems[this.selectedTabIndex];
    },
    content () {
      return this.selectedTab && this.selectedTab.content;
    },
    primaryHeaderImageUrl () {
      const image = this.selectedTab && this.selectedTab.primaryHeaderImage;
      return (image && image.file) ? image.file.publicUrl : '';
    },
    subHeaderImageUrl () {
      const image = this.selectedTab && this.selectedTab.subHeaderImage;
      return (image && image.file) ? image.file.publicUrl : '';
    },
  },
  mounted () {
    console.log('sortedTabItems', this.sortedTabItems);
  },
};
</script>
