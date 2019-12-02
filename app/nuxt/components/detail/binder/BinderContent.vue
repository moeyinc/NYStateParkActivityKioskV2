<template>
  <div class="binder-content-wrapper">
    <div :style="topLeftGapFillerStyle" class="top-left-gap-filler" />
    <div :style="binderContentStyle" class="binder-content">
      <div class="binder-content-inner">
        <div
          v-if="primaryHeaderImageUrl"
          class="header-image-container"
        >
          <img
            :src="primaryHeaderImageUrl"
            :style="primaryHeaderImageStyle"
            class="primary header-image"
          >
          <img
            v-if="subHeaderImageUrl"
            :src="subHeaderImageUrl"
            :style="subHeaderImageStyle"
            class="sub header-image"
          >
        </div>
        <div class="wysiwyg">
          <div v-html="imgSrcReplacedContent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    primaryHeaderImageUrl: {
      type: String,
      default: '',
    },
    subHeaderImageUrl: {
      type: String,
      default: '',
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
    textColor: {
      type: String,
      default: '',
    },
  },
  computed: {
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
    imgSrcReplacedContent () {
      return this.content.replace('../../media', process.env.MEDIA_URL);
    },
    primaryHeaderImageStyle () {
      return {
        borderColor: this.textColor,
        width: this.subHeaderImageUrl ? '960px' : '100%',
      };
    },
    subHeaderImageStyle () {
      return {
        borderColor: this.textColor,
      };
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
    overflow: hidden
    .binder-content-inner
      padding: 20px
      height: 100%
      .header-image-container
        height: 360px
        margin-bottom: 40px
        display: flex
        justify-content: space-between
        img.header-image
          height: 100%
          object-fit: cover
          object-position: center
          border: 2px;
          border-style: solid;
          overflow: hidden;
          &.sub
            width: 500px
</style>

<style lang="stylus">
@import '~@styles/fonts'

.binder-content-inner
  .wysiwyg
    font-family: $base-font
    font-size: 32px
    line-height: 1.3em
    h1, h2, h3, h4, h5
      font-family: $title-font
      margin-bottom: 1em
    h1
      font-size: 40px
    p
      margin-bottom: 1em
    em
      font-family: $base-font-oblique
      strong
        font-family: $title-font-oblique
    strong
      font-family: $title-font
      em
        font-family: $title-font-oblique
    ul
      list-style-type: disc
      list-style-position: inside
    ol
      list-style-type: decimal
      list-style-position: inside
    td
      vertical-align: top
</style>
