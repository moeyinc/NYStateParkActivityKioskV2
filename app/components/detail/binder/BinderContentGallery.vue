<template>
  <div class="binder-content-gallery">
    <BinderContentGalleryItem
      v-for="(galleryImage) in galleryImages"
      :key="galleryImage.id"
      :image-filename="galleryImage.file && galleryImage.file.filename"
      :caption="galleryImage.caption"
      @load="onLoad"
    />
  </div>
</template>

<script>
import BinderContentGalleryItem from './BinderContentGalleryItem';

export default {
  components: {
    BinderContentGalleryItem,
  },
  props: {
    galleryImages: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    overlay: false,
    loadedCount: 0,
  }),
  methods: {
    onLoad () {
      this.loadedCount++;
      if (this.loadedCount >= this.galleryImages.length) {
        this.$emit('all-images-loaded');
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.binder-content-gallery
  display: flex
  flex-wrap: wrap
</style>
