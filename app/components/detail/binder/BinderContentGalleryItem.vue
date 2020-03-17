<template>
  <div>
    <VueLightbox
      :src="$getFileURL(imageFilename)"
      :caption="caption"
      album="albumGallery"
    >
      <img
        :src="$getFileURL(imageFilename)"
        :style="{borderColor: generalSettings.textColor}"
        :class="['gallery-item', {loaded}]"
        @click="$emit('click')"
        @load="onLoad"
      >
    </VueLightbox>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    imageFilename: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    loaded: false,
  }),
  computed: {
    ...mapState(['generalSettings']),
  },
  methods: {
    onLoad () {
      this.loaded = true;
      this.$emit('load');
    },
  },
};
</script>

<style scoped lang="stylus">
.gallery-item
  width: auto
  height: 400px
  object-fit: cover
  object-position: center
  overflow: hidden
  margin-right: 20px
  margin-bottom: 20px
  &.loaded
    border: 2px
    border-style: solid
</style>

<style lang="stylus">
.lb-nav
  a.lb-prev, a.lb-next
    opacity: 1
</style>
