<template>
  <div
    :style="{
      width: size * 2 + 'px',
      height: size * 2 + 'px',
    }"
    class="arrow-button"
    @click="$emit('click')"
  >
    <div
      :class="['inner', {
        up: direction === 'up',
        down: direction === 'down',
        left: direction === 'left',
        right: direction === 'right',
      }]"
    >
      <div
        :class="['triangle', {
          up: direction === 'up',
          down: direction === 'down',
          left: direction === 'left',
          right: direction === 'right',
        }]"
        :style="{
          backgroundColor: color,
          fontSize: size + 'px',
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'up',
      validator: (val) => ['up', 'down', 'left', 'right'],
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 20,
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/triangle'

.arrow-button
  overflow: hidden
  transition: transform 0.1s ease-out
  &:active
    transform: scale(1.2)
  .inner
    height: 100%
    &.up
      transform: translate(38%, 44%)
    &.down
      transform: translate(38%, 3%)
    &.left
      transform: translate(42%, 38%)
    &.right
      transform: translate(28%, 26%)
</style>
