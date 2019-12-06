<template>
  <div class="binder-content-gallery">
    <BinderContentGalleryItem
      v-for="(galleryImage) in galleryImages"
      :key="galleryImage.id"
      :public-url="galleryImage.file && galleryImage.file.publicUrl"
      :caption="galleryImage.caption"
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
  }),
};
</script>

<style scoped lang="stylus">
.binder-content-gallery
  display: flex
  flex-wrap: wrap
</style>
