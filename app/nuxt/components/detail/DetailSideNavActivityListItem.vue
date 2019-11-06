<template>
  <div
    :class="['side-nav-activity-list-item', {selected}]"
    @mousedown="active = true"
    @mouseup="active = false"
    @mouseleave="active = false"
    @click="$emit('click')"
  >
    <div class="tab-edge upper" :style="tabEdgeStyle">
      <div class="inner" :style="upperTabEdgeInnerStyle" />
    </div>
    <div class="tab" :style="tabStyle">
      <div class="svg-wrapper">
        <simple-svg
          :src="require('@media/icons/' + activityIconFilename)"
          fill-class-name="fill-to-change"
          :fill="svgColor"
          stroke-class-name="stroke-to-change"
          :stroke="svgColor"
          height="60%"
        />
      </div>
      <div class="label-wrapper">
        <div class="button-label" :style="labelStyle">
          {{ activityButtonLabel }}
        </div>
      </div>
    </div>
    <div class="tab-edge lower" :style="tabEdgeStyle">
      <div class="inner" :style="lowerTabEdgeInnerStyle" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import activityMixin from '@/mixins/activityMixin';

export default {
  mixins: [activityMixin],
  props: {
    activity: {
      type: Object,
      default: null,
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
        backgroundColor: this.active ? 'white' : this.activityMainColor,
      };
    },
    tabEdgeStyle () {
      return {
        backgroundColor: this.active ? 'white' : this.activityMainColor,
      };
    },
    upperTabEdgeInnerStyle () {
      return {
        backgroundColor: this.generalSettings.backgroundColor.hex,
        borderBottomRightRadius: this.selected && !this.firstTab ? '10px' : '0',
      };
    },
    lowerTabEdgeInnerStyle () {
      return {
        backgroundColor: this.generalSettings.backgroundColor.hex,
        borderTopRightRadius: this.selected ? '10px' : '0',
      };
    },
    svgColor () {
      return this.active ? this.activityMainColor : 'white';
    },
    labelStyle () {
      return {
        color: this.svgColor,
      };
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/fonts'

.side-nav-activity-list-item
  height: 75px
  margin-top: -10px
  position: relative
  &.selected
    z-index: 1000
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
