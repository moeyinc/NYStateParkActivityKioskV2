<template>
  <nav>
    <DetailMainTabListItem
      v-for="(tab, index) in tabs"
      :key="index"
      :label="tab.tabLabel"
      :main-color="mainColor"
      :sub-color="subColor"
      :firstTab="index === 0"
      :selected="index === selectedTabIndex"
      @click="$emit('select-tab', index)"
    />
  </nav>
</template>

<script>
import DetailMainTabListItem from './DetailMainTabListItem';

export default {
  components: {
    DetailMainTabListItem,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    mainColor: {
      type: String,
      default: '',
    },
    subColor: {
      type: String,
      default: '',
    },
    selectedTabIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    selectTab (index) {
      this.selectedTabIndex = index;
    },
  },
};
</script>

<style scoped lang="stylus">
nav
  height: 72px
  display: flex
</style>
