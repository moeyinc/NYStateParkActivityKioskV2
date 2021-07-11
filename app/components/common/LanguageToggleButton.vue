<template>
  <div class="toggle-button-wrapper">
    <button
      :style="getButtonStyle(true, false)"
      class="left"
      @click="() => updateIsSpanishEnabled(false)"
    >
      <div class="button-label">
        EN
      </div>
    </button>
    <button
      :style="getButtonStyle(false, true)"
      class="right"
      @click="() => updateIsSpanishEnabled(true)"
    >
      <div class="button-label">
        ES
      </div>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['isSpanishEnabled', 'generalSettings']),
  },
  methods: {
    ...mapMutations(['updateIsSpanishEnabled']),
    getButtonStyle (isLeft, isSpanish) {
      const active = (isSpanish === this.isSpanishEnabled);
      const borderWidth = isLeft ? '3px 0 3px 3px' : '3px 3px 3px 0';
      return {
        color: active ? 'white' : '#C0D1D7',
        backgroundColor: active ? this.generalSettings.textColor : 'white',
        borderStyle: active ? 'none' : 'solid',
        borderWidth: active ? 0 : borderWidth,
        borderColor: active ? '' : '#C0D1D7',
      };
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/fonts'

.toggle-button-wrapper
  display: flex
  button
    height: 56px
    width: 70px
    font-size: 22px
    position: relative
    font-family: $title-font
    &.left
      border-radius: 26px 0 0 26px
      .button-label
        position: absolute
        top: 50%
        left: 58%
        transform: translate(-50%, -50%)
    &.right
      border-radius: 0 26px 26px 0
      .button-label
        position: absolute
        top: 50%
        left: 42%
        transform: translate(-50%, -50%)
</style>
