<template>
  <div
    :class="['detail-main-tab-list-item', {selected}]"
    :style="tabContainerStyle"
    @click="$emit('click')"
  >
    <div class="tab-edge left">
      <div :style="leftTabEdgeInnerStyle" class="inner" />
    </div>
    <div :style="tabStyle" class="tab">
      {{ label }}
    </div>
    <div class="tab-edge right">
      <div :style="rightTabEdgeInnerStyle" class="inner" />
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
    width: {
      type: Number,
      default: 370,
    },
  },
  computed: {
    tabContainerStyle () {
      return {
        width: `${this.width + 40}px`,
      };
    },
    tabStyle () {
      return {
        width: `${this.width}px`,
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
  height: 100%
  margin-left: -20px
  display: flex
  position: relative
  &.selected
    z-index: 1000
  .tab
    height: 100%
    border-radius: 20px 20px 0 0
    display: flex
    justify-content: center
    align-items: center
    font-size: 40px
    font-family: $title-font
    padding-top: 5px
  .tab-edge
    width: 20px
    height: 100%
    background-color: white
    >.inner
      height: 100%
</style>
