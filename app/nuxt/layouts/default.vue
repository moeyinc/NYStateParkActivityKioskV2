<template>
  <div
    class="default-layout"
    :style="{
      backgroundColor: backgroundColor,
      color: textColor,
    }"
  >
    <nuxt />
  </div>
</template>

<script>
import { generalSettings } from '@/test-data';
export default {
  computed: {
    backgroundColor () {
      return generalSettings.backgroundColor.hex;
    },
    textColor () {
      return generalSettings.textColor.hex;
    },
  },
};
</script>

<style scoped lang="stylus">
.default-layout
  width: 1920px
  height: 1080px
  overflow: hidden
</style>
