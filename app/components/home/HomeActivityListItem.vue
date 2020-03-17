<template>
  <div
    :style="buttonStyle"
    @mousedown="active = true"
    @mouseup="active = false"
    @mouseleave="active = false"
    @click="$emit('click')"
    class="home-activity-list-item"
  >
    <div class="inner">
      <simple-svg
        :src="iconFilename"
        :fill="svgColor"
        :stroke="svgColor"
        :height="svgHeight"
        @load="iconLoaded = true"
        fill-class-name="fill-to-change"
        stroke-class-name="stroke-to-change"
      />
      <div
        v-show="iconLoaded"
        :style="labelStyle"
        class="button-label"
      >
        {{ label }}
      </div>
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
    iconFilename: {
      type: String,
      default: '',
    },
    mainColor: {
      type: String,
      default: '',
    },
    buttonWidth: {
      type: Number,
      default: 0,
    },
    buttonHeight: {
      type: Number,
      default: 0,
    },
    buttonMargin: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    active: false,
    iconLoaded: false,
  }),
  computed: {
    buttonStyle () {
      return {
        width: this.buttonWidth + 'px',
        height: this.buttonHeight + 'px',
        margin: this.buttonMargin,
        backgroundColor: this.active ? 'white' : this.mainColor,
      };
    },
    svgColor () {
      return this.active ? this.mainColor : 'white';
    },
    svgHeight () {
      return (this.buttonHeight * 0.6) + 'px';
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

.home-activity-list-item
  border-radius: 50px
  .inner
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100%
    .button-label
      font-family: $title-font
      margin-top: 20px
      font-size: 28px
</style>
