<template>
  <div :class="['detail-main-tab-list-item', {selected}]" @click="$emit('click')">
    <div class="tab-edge left">
      <div class="inner" :style="leftTabEdgeInnerStyle" />
    </div>
    <div class="tab" :style="tabStyle">
      {{ label }}
    </div>
    <div class="tab-edge right">
      <div class="inner" :style="rightTabEdgeInnerStyle" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    mainColor: {
      type: String,
      default: '',
    },
    subColor: {
      type: String,
      default: '',
    },
    firstTab: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tabStyle () {
      return {
        color: this.selected ? '' : 'white',
        backgroundColor: this.selected ? 'white' : this.subColor,
      };
    },
    leftTabEdgeInnerStyle () {
      return {
        backgroundColor: this.mainColor,
        borderBottomRightRadius: this.selected && !this.firstTab ? '20px' : '0',
      };
    },
    rightTabEdgeInnerStyle () {
      return {
        backgroundColor: this.mainColor,
        borderBottomLeftRadius: this.selected ? '20px' : '0',
      };
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/fonts'

.detail-main-tab-list-item
  width: 410px
  height: 100%
  margin-left: -20px
  display: flex
  position: relative
  &.selected
    z-index: 1000
  .tab
    width: 370px
    height: 100%
    border-radius: 20px 20px 0 0
    display: flex
    justify-content: center
    align-items: center
    font-size: 40px
    font-family: $title-font
  .tab-edge
    width: 20px
    height: 100%
    background-color: white
    >.inner
      height: 100%
</style>
