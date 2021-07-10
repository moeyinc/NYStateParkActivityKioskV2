<template>
  <div class="scrollbar-container">
    <ArrowButton
      v-show="isScrollbarVisible"
      :color="generalSettings.textColor"
      :size="20"
      direction="up"
      class="up-button"
      @click="$emit('scroll-up')"
    />
    <Scrollbar
      :width="30"
      :base-color="'#EEEEEE'"
      :base-border-radius="15"
      :thumb-color="generalSettings.textColor"
      :thumb-border-radius="15"
      class="scrollbar"
      @visibility-changed="(val) => isScrollbarVisible = val"
    />
    <ArrowButton
      v-show="isScrollbarVisible"
      :color="generalSettings.textColor"
      :size="20"
      direction="down"
      class="down-button"
      @click="$emit('scroll-down')"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArrowButton from '@comps/common/ArrowButton';
import Scrollbar from './Scrollbar';

export default {
  components: {
    Scrollbar,
    ArrowButton,
  },
  data: () => ({
    isScrollbarVisible: true,
  }),
  computed: {
    ...mapState(['generalSettings']),
  },
};
</script>

<style scoped lang="stylus">
@import '~@styles/triangle'

.scrollbar-container
  display: flex
  flex-direction: column
  align-items: center
  .up-button
    margin-bottom: 10px
  .down-button
    margin-top: 10px
</style>
