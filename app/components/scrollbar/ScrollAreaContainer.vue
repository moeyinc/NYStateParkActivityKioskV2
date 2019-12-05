<template>
  <div id="scroll-area-container">
    <div
      id="scroll-area-content"
      :style="contentPosition"
      @wheel="(e) => wheelScroll && scroll(e)"
      @touchstart="(e) => touchScroll && startDrag(e)"
      @touchmove="(e) => touchScroll && onDrag(e)"
      @touchend="(e) => touchScroll && stopDrag(e)"
      @mousedown="(e) => mouseScroll && startDrag(e)"
      @mousemove="(e) => mouseScroll && onDrag(e)"
      @mouseup="(e) => mouseScroll && stopDrag(e)"
      @mouseleave="(e) => mouseScroll && stopDrag(e)"
    >
      <slot />
    </div>
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
    scrollSpeed: {
      type: Number,
      validator: (value) => value > 0,
      default: 50,
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
      scrollbar: null,
      $scrollAreaContainer: null,
      $scrollAreaContent: null,
      containerHeight: 0,
      contentHeight: 0,
      scrollTop: 0,
      dragging: false,
      start: { y: 0 },
    };
  },
  computed: {
    overflowRate () {
      if (!this.contentHeight) return 0;
      return this.containerHeight / this.contentHeight;
    },
    contentPosition () {
      return {
        marginTop: this.scrollTop * -1 + 'px',
      };
    },
  },
  mounted () {
    this.getDomElements();
    this.addEventListeners();
    this.registerRef();
    this.$nextTick(this.initScroll);
  },
  destroyed () {
    this.removeRef();
    this.removeEventListeners();
  },
  methods: {
    getDomElements () {
      this.$scrollAreaContainer =
        document.getElementById('scroll-area-container');
      this.$scrollAreaContent =
        document.getElementById('scroll-area-content');
    },
    addEventListeners () {
      window.addEventListener('resize', this.calculateSize);
    },
    removeEventListeners () {
      window.removeEventListener('resize', this.calculateSize);
    },
    registerRef () {
      this.$root.$refs[this.scrollAreaContainerRefName] = this;
    },
    removeRef () {
      delete this.$root.$refs[this.scrollAreaContainerRefName];
      // let scrollbar know I'm dead
      if (this.scrollbar) {
        this.scrollbar.removeScrollAreaContainerRef();
      }
    },
    removeScrollbarRef () {
      this.scrollbar = null;
    },
    initScroll () {
      // get scrollbar component from root refs
      this.scrollbar = this.$root.$refs[this.scrollbarRefName];

      // if the scrollbar doesn't have ref to this component,
      // let it get that
      if (this.scrollbar && !this.scrollbar.scrollAreaContainer) {
        this.scrollbar.getScrollAreaContainer();
      }

      // calculate container & content size, and update scrollbar data
      this.calculateSize();
    },
    calculateSize (updateScrollbar = true) {
      this.setContainerHeight();
      this.setContentHeight();
      if (updateScrollbar) this.updateScrollbarThumb();
    },
    updateScrollbarThumb () {
      if (!this.scrollbar) return;

      const thumbHeigtPct = this.overflowRate * 100;
      this.scrollbar.setThumbHeightPct(thumbHeigtPct);

      const thumbPosPct = this.contentHeight
        ? (this.scrollTop / this.contentHeight) * 100 : 0;
      this.scrollbar.setThumbPosPct(thumbPosPct);
    },
    setContainerHeight () {
      const style = getComputedStyle(this.$scrollAreaContainer);
      const height = parseInt(style.height);
      if (style.boxSizing === 'border-box') {
        const paddingTop = parseInt(style.paddingTop);
        const paddingBottom = parseInt(style.paddingBottom);
        const borderTop = parseInt(style.borderTop);
        const borderBottom = parseInt(style.borderBottom);
        this.containerHeight = height -
          (paddingTop + paddingBottom + borderTop + borderBottom);
      } else {
        this.containerHeight = height;
      }
    },
    setContentHeight () {
      // margin is ignored to use it for scroll positioning
      const style = getComputedStyle(this.$scrollAreaContent);
      const height = parseInt(style.height);
      if (style.boxSizing === 'border-box') {
        this.contentHeight = height;
      } else {
        const paddingTop = parseInt(style.paddingTop);
        const paddingBottom = parseInt(style.paddingBottom);
        const borderTop = parseInt(style.borderTop);
        const borderBottom = parseInt(style.borderBottom);
        this.contentHeight = height +
          (paddingTop + paddingBottom + borderTop + borderBottom);
      }
    },
    scroll (e) {
      if (e.preventDefault) e.preventDefault();
      // update container & content size
      this.calculateSize(false);

      // Set the wheel step
      const num = this.scrollSpeed;

      // DOM events
      const scrollY = e.deltaY > 0 ? num : -(num);

      // Next Value
      const nextY = this.scrollTop + scrollY;

      // Is it Scrollable?
      const canScrollY = this.contentHeight > this.containerHeight;

      // Vertical Scrolling
      if (canScrollY) this.scrollToY(nextY);
    },
    scrollToY (nextY) {
      // Vertical Scrolling
      const lowerEnd = this.contentHeight - this.containerHeight;

      if (nextY > lowerEnd) {
        // Max Scroll Down
        nextY = lowerEnd;
      } else if (nextY < 0) {
        // Max Scroll Up
        nextY = 0;
      }

      if (lowerEnd < 0) nextY = 0;

      // Update the Vertical Value
      this.scrollTop = nextY;

      // update thumb
      this.updateScrollbarThumb();
    },
    startDrag (e) {
      e.preventDefault();
      e.stopPropagation();
      e = e.changedTouches ? e.changedTouches[0] : e;
      // update container & content size
      this.calculateSize(false);
      // Prepare to drag
      this.dragging = true;
      this.start = { y: e.pageY };
    },
    onDrag (e, invert = true) {
      if (this.dragging) {
        e.preventDefault();
        e = e.changedTouches ? e.changedTouches[0] : e;

        // Invers the Movement
        let yMovement = e.clientY - this.start.y;
        if (invert) yMovement *= -1;

        // Update the last e.client
        this.start = { y: e.clientY };

        // The next Vertical Value will be
        const nextY = this.scrollTop + yMovement;

        this.scrollToY(nextY);
      }
    },
    stopDrag (e) {
      this.dragging = false;
    },
  },
};
</script>

<style scoped lang="stylus">
#scroll-area-container
  overflow: hidden

  #scroll-area-content
    transition: margin-top 0.5s ease
</style>
