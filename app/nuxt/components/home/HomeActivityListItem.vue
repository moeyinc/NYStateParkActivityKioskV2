<template>
  <div
    class="home-activity-list-item"
    :style="buttonStyle"
    @mousedown="active = true"
    @mouseup="active = false"
    @mouseleave="active = false"
    @click="$emit('click')"
  >
    <div class="inner">
      <simple-svg
        :src="require('@media/icons/' + activityIconFilename)"
        fill-class-name="fill-to-change"
        :fill="svgColor"
        stroke-class-name="stroke-to-change"
        :stroke="svgColor"
        :height="svgHeight"
      />
      <div
        class="button-label"
        :style="labelStyle"
      >
        {{ activityButtonLabel }}
      </div>
    </div>
  </div>
</template>

<script>
import activityMixin from '@/mixins/activityMixin';

export default {
  mixins: [activityMixin],
  props: {
    activity: {
      type: Object,
      default: null,
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
  }),
  computed: {
    buttonStyle () {
      return {
        width: this.buttonWidth + 'px',
        height: this.buttonHeight + 'px',
        margin: this.buttonMargin,
        backgroundColor: this.active ? 'white' : this.activityMainColor,
      };
    },
    svgColor () {
      return this.active ? this.activityMainColor : 'white';
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
