<template>
  <div class="binder-content-wrapper">
    <div :style="topLeftGapFillerStyle" class="top-left-gap-filler" />
    <div :style="binderContentStyle" class="binder-content">
      <ScrollAreaContainer
        ref="scroll-area-container"
        :scroll-speed="200"
        class="binder-content-inner"
      >
        <BinderContentGeneral
          v-if="!(selectedTab && selectedTab.isGallery)"
          :content="content"
          :primary-header-image-filename="primaryHeaderImageFilename"
          :sub-header-image-filename="subHeaderImageFilename"
        />
        <BinderContentGallery
          v-if="selectedTab && selectedTab.isGallery"
          :gallery-images="selectedTab && selectedTab.galleryImages"
          @all-images-loaded="onAllGalleryImagesLoaded"
        />
      </ScrollAreaContainer>
      <ScrollbarContainer
        class="scrollbar-container"
        @scroll-up="scrollY(-1)"
        @scroll-down="scrollY(1)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ScrollAreaContainer from '@comps/scrollbar/ScrollAreaContainer';
import ScrollbarContainer from '@comps/scrollbar/ScrollbarContainer';
import BinderContentGeneral from './BinderContentGeneral';
import BinderContentGallery from './BinderContentGallery';

export default {
  components: {
    ScrollAreaContainer,
    ScrollbarContainer,
    BinderContentGeneral,
    BinderContentGallery,
  },
  props: {
    selectedTab: {
      type: Object,
      default: null,
    },
    isFirstTabSelected: {
      type: Boolean,
      default: false,
    },
    mainColor: {
      type: String,
      default: '',
    },
    subColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['isSpanishEnabled']),
    topLeftGapFillerStyle () {
      return {
        backgroundColor: this.subColor,
      };
    },
    binderContentStyle () {
      return {
        borderRadius: this.isFirstTabSelected ? '0 20px 20px 20px' : '20px',
      };
    },
    content () {
      return this.isSpanishEnabled ? this.selectedTab && this.selectedTab.contentInSpanish : this.selectedTab && this.selectedTab.content;
    },
    primaryHeaderImageFilename () {
      const image = this.selectedTab && this.selectedTab.primaryHeaderImage;
      return (image && image.file) ? image.file.filename : '';
    },
    subHeaderImageFilename () {
      const image = this.selectedTab && this.selectedTab.subHeaderImage;
      return (image && image.file) ? image.file.filename : '';
    },
  },
  watch: {
    selectedTab (newVal) {
      // re-calculate content area height and scrollbar thumb heigt
      this.$nextTick(() => {
        this.$refs['scroll-area-container'].calculateSize();
        this.$refs['scroll-area-container'].scrollToY(0);
      });
    },
  },
  methods: {
    scrollY (deltaY) {
      this.$refs['scroll-area-container'].scroll({ deltaY });
    },
    onAllGalleryImagesLoaded () {
      this.$refs['scroll-area-container'].calculateSize();
    },
  },
};
</script>

<style scoped lang="stylus">
.binder-content-wrapper
  height: 752px
  position: relative
  .top-left-gap-filler
    position: absolute
    width: 20px
    height: 20px
  .binder-content
    z-index: 100
    position: absolute
    width: 100%
    height: 100%
    background-color: white
    border-radius: 20px
    padding: 20px 50px 20px 20px
    .binder-content-inner
      padding: 20px
      height: 100%
    .scrollbar-container
      position: absolute
      top: 20px
      right: 20px
      bottom: 20px
      width: 30px
</style>
