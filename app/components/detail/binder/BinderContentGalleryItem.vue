<template>
  <div>
    <VueLightbox
      :src="publicUrl"
      :caption="caption"
      album="albumGallery"
    >
      <img
        :src="publicUrl"
        :style="{borderColor: generalSettings.textColor}"
        @click="$emit('click')"
        class="gallery-item"
      >
    </VueLightbox>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    publicUrl: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['generalSettings']),
  },
};
</script>

<style scoped lang="stylus">
.gallery-item
  width: auto
  height: 400px
  object-fit: cover
  object-position: center
  border: 2px
  border-style: solid
  overflow: hidden
  margin-right: 20px
  margin-bottom: 20px
</style>

<style lang="stylus">
.lb-nav
  a.lb-prev, a.lb-next
    opacity: 1
</style>
