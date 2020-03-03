<template>
  <nav>
    <BinderTabListItem
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :label="tab.tabLabel"
      :width="tab.tabWidth"
      :main-color="mainColor"
      :sub-color="subColor"
      :first-tab="index === 0"
      :selected="index === selectedTabIndex"
      @click="$emit('select-tab', index)"
    />
  </nav>
</template>

<script>
import BinderTabListItem from './BinderTabListItem';

export default {
  components: {
    BinderTabListItem,
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
  mounted () {
    console.log(this.tabs);
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
