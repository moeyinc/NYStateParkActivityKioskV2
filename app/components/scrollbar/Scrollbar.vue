<template>
  <div
    v-if="displayable"
    :style="baseStyle"
    class="scrollbar-base"
    @wheel="(e) => wheelScroll && scroll(e)"
  >
    <div
      :style="thumbStyle"
      class="scrollbar-thumb"
      @touchstart="(e) => touchScroll && startDrag(e)"
      @mousedown="(e) => mouseScroll && startDrag(e)"
    />
  </div>
</template>

<script>
export default {
  props: {
    scrollAreaContainerRefName: {
      type: String,
      default: 'scrollAreaContainer',
    },
    scrollbarRefName: {
      type: String,
      default: 'scrollbar',
    },
    width: {
      type: Number,
      default: 20,
    },
    baseColor: {
      type: String,
      default: 'lightgrey',
    },
    baseBorderRadius: {
      type: Number,
      default: 10,
    },
    thumbColor: {
      type: String,
      default: 'darkgrey',
    },
    thumbBorderRadius: {
      type: Number,
      default: 10,
    },
    display: {
      type: Boolean,
      default: true,
    },
    wheelScroll: {
      type: Boolean,
      default: true,
    },
    touchScroll: {
      type: Boolean,
      default: true,
    },
    mouseScroll: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      scrollAreaContainer: null,
      thumbHeightPct: 0,
      thumbPosPct: 0,
      count: 0,
    };
  },
  computed: {
    baseStyle () {
      return {
        width: this.width + 'px',
        backgroundColor: this.baseColor,
        borderRadius: this.baseBorderRadius + 'px',
      };
    },
    thumbStyle () {
      return {
        width: this.width + 'px',
        height: this.thumbHeightPct + '%',
        backgroundColor: this.thumbColor,
        borderRadius: this.thumbBorderRadius + 'px',
        top: this.thumbPosPct + '%',
      };
    },
    displayable () {
      if (this.thumbHeightPct > 100) return false;
      return this.display;
    },
  },
  watch: {
    displayable (newVal) {
      this.$emit('visibility-changed', newVal);
    },
  },
  mounted () {
    // register this to $root.$refs
    this.registerRef();
    this.addEventListeners();
    this.$nextTick(this.getScrollAreaContainer);
  },
  destroyed () {
    this.removeRef();
    this.removeEventListeners();
  },
  methods: {
    registerRef () {
      this.$root.$refs[this.scrollbarRefName] = this;
    },
    removeRef () {
      delete this.$root.$refs[this.scrollbarRefName];
      // let scrollbar area container know I'm dead
      if (this.scrollAreaContainer) {
        this.scrollAreaContainer.removeScrollbarRef();
      }
    },
    removeScrollAreaContainerRef () {
      this.scrollAreaContainer = null;
    },
    addEventListeners () {
      if (this.mouseScroll) {
        this.$root.$el.addEventListener('mousemove', this.onDrag);
        this.$root.$el.addEventListener('mouseup', this.stopDrag);
        this.$root.$el.addEventListener('mouseleave', this.stopDrag);
      }
      if (this.touchScroll) {
        this.$root.$el.addEventListener('touchmove', this.onDrag);
        this.$root.$el.addEventListener('touchend', this.stopDrag);
      }
    },
    removeEventListeners () {
      if (this.mouseScroll) {
        this.$root.$el.removeEventListener('mousemove', this.onDrag);
        this.$root.$el.removeEventListener('mouseup', this.stopDrag);
        this.$root.$el.removeEventListener('mouseleave', this.stopDrag);
      }
      if (this.touchScroll) {
        this.$root.$el.removeEventListener('touchmove', this.onDrag);
        this.$root.$el.removeEventListener('touchend', this.stopDrag);
      }
    },
    getScrollAreaContainer () {
      // get scroll area container component from root refs
      this.scrollAreaContainer =
        this.$root.$refs[this.scrollAreaContainerRefName];

      // if the container doesn't have ref to this component,
      // let it get that and initialize the scroll data
      if (this.scrollAreaContainer && !this.scrollAreaContainer.scrollbar) {
        this.scrollAreaContainer.initScroll();
      }
    },
    setThumbHeightPct (value) {
      if (typeof value !== 'number') return;
      this.thumbHeightPct = value;
    },
    setThumbPosPct (value) {
      if (typeof value !== 'number') return;
      this.thumbPosPct = value;
    },
    scroll (e) {
      if (!this.scrollAreaContainer) return;
      this.scrollAreaContainer.scroll(e);
    },
    startDrag (e) {
      if (!this.scrollAreaContainer) return;
      this.scrollAreaContainer.startDrag(e);
    },
    onDrag (e) {
      if (!this.scrollAreaContainer) return;
      this.scrollAreaContainer.onDrag(e, false);
    },
    stopDrag (e) {
      if (!this.scrollAreaContainer) return;
      this.scrollAreaContainer.stopDrag(e);
    },
  },
};
</script>

<style scoped lang="stylus">
.scrollbar-base
  position: relative
  height: 100%

  .scrollbar-thumb
    position: absolute
</style>
