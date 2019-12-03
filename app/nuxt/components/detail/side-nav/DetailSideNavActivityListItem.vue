<template>
  <div
    :class="['side-nav-activity-list-item', {selected}]"
    @mousedown="active = true"
    @mouseup="active = false"
    @mouseleave="active = false"
    @click="$emit('click')"
  >
    <div :style="tabEdgeStyle" class="tab-edge upper">
      <div :style="upperTabEdgeInnerStyle" class="inner" />
    </div>
    <div :style="tabStyle" class="tab">
      <div class="svg-wrapper">
        <simple-svg
          :src="iconUrl"
          :fill="svgColor"
          :stroke="svgColor"
          fill-class-name="fill-to-change"
          stroke-class-name="stroke-to-change"
          height="60%"
        />
      </div>
      <div class="label-wrapper">
        <div :style="labelStyle" class="button-label">
          {{ label }}
        </div>
      </div>
    </div>
    <div :style="tabEdgeStyle" class="tab-edge lower">
      <div :style="lowerTabEdgeInnerStyle" class="inner" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    iconUrl: {
      type: String,
      default: '',
    },
    mainColor: {
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
  data: () => ({
    active: false,
  }),
  computed: {
    ...mapState(['generalSettings']),
    tabStyle () {
      return {
        backgroundColor: this.active ? 'white' : this.mainColor,
      };
    },
    tabEdgeStyle () {
      return {
        backgroundColor: this.active ? 'white' : this.mainColor,
      };
    },
    upperTabEdgeInnerStyle () {
      return {
        backgroundColor: this.generalSettings.backgroundColor,
        borderBottomRightRadius: this.selected && !this.firstTab ? '10px' : '0',
      };
    },
    lowerTabEdgeInnerStyle () {
      return {
        backgroundColor: this.generalSettings.backgroundColor,
        borderTopRightRadius: this.selected ? '10px' : '0',
      };
    },
    svgColor () {
      return this.active ? this.mainColor : 'white';
    },
    labelStyle () {
      return {
        color: this.svgColor,
      };
    },
  },
  watch: {
    active (newVal) {
      if (this.firstTab) this.updateIsFirstSideNavItemActive(newVal);
    },
  },
  methods: {
    ...mapMutations(['updateIsFirstSideNavItemActive']),
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/fonts'

.side-nav-activity-list-item
  height: 75px
  margin-top: -10px
  position: relative
  // transition: transform 0.2s ease-out
  &.selected
    z-index: 10
  // &:not(.selected)
  //   transform: translateX(20px)
  .tab
    height: 55px
    border-radius: 27px 0 0 27px
    padding: 0 10px 0 15px
    display: flex
    .svg-wrapper
      flex-grow: 0
      height: 100%
      display: flex
      align-items: center
      justify-content: center
    .label-wrapper
      height: 100%
      display: flex
      align-items: center
      .button-label
        font-family: $title-font
        font-size: 20px
        padding-left: 10px
  .tab-edge
    height: 10px
    >.inner
      height: 100%
</style>
