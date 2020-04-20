<template>
  <div
    :class="['side-nav-activity-list-item', {selected, 'first-tab': firstTab}]"
    @mousedown="active = true"
    @mouseup="active = false"
    @mouseleave="active = false"
    @click="$emit('click')"
  >
    <div :style="tabEdgeStyle" class="tab-edge upper">
      <div :style="upperTabEdgeInnerStyle" class="inner" />
    </div>
    <div :style="tabStyle" class="tab">
      <div
        v-if="firstTab"
        class="box-shadow-adjustment"
      />
      <div class="svg-wrapper">
        <simple-svg
          :src="$getFileURL(iconFilename)"
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
    iconFilename: {
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
  &.selected
    z-index: 10
  &:not(.selected)
    &:not(.first-tab)
      .tab
        box-shadow: rgba(0, 0, 0, 0.2) -10px 0px 10px 0px inset
    &.first-tab
      .tab
        .box-shadow-adjustment
          box-shadow: -10px 0 10px -6px rgba(0,0,0,.2) inset
  .tab
    height: 55px
    border-radius: 27px 0 0 27px
    padding: 0 10px 0 15px
    display: flex
    position: relative
    .box-shadow-adjustment
      position: absolute
      height: 35px
      width: 15px
      right: 0
      bottom: 0
    .svg-wrapper
      flex-grow: 0
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      width: 30px
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
