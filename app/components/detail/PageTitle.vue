<template>
  <div class="detail-main-title">
    <h1>{{ title }}</h1>
    <div class="icon-wrapper">
      <simple-svg
        :src="$getFileURL(iconFilename)"
        fill-class-name="fill-to-change"
        fill="white"
        stroke-class-name="stroke-to-change"
        stroke="white"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    iconFilename: {
      type: String,
      default: '',
    },
  },
};
</script>
<style scoped lang="stylus">
@import '~@styles/fonts'

.detail-main-title
  width: 100%
  height: 176px
  display: flex
  align-items: center
  position: relative
  h1
    font-family: $title-font
    font-size: 120px
    color: white
  .icon-wrapper
    position: absolute
    top: 50%
    right: 20px
    transform: translateY(-50%)
    width: 136px
    height: 136px
</style>
