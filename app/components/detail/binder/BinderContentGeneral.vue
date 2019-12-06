<template>
  <div class="binder-content-general">
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
      <div v-html="filteredContent" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
  },
  computed: {
    ...mapState(['generalSettings']),
    filteredContent () {
      return this.content
        .replace('../../media', process.env.MEDIA_URL)
        .replace('<a href', '<a disabled-href');
    },
    primaryHeaderImageStyle () {
      return {
        borderColor: this.generalSettings.textColor,
        width: this.subHeaderImageUrl ? '960px' : '100%',
      };
    },
    subHeaderImageStyle () {
      return {
        borderColor: this.generalSettings.textColor,
      };
    },
  },
};
</script>

<style scoped lang="stylus">
.binder-content-general
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
