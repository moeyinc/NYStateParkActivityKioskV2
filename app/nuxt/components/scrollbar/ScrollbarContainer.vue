<template>
  <div class="scrollbar-container">
    <ArrowButton
      :color="generalSettings.textColor"
      :size="20"
      @click="$emit('scroll-up')"
      direction="up"
      class="up-button"
    />
    <Scrollbar
      :width="30"
      :base-color="'#EEEEEE'"
      :base-border-radius="15"
      :thumb-color="generalSettings.textColor"
      :thumb-border-radius="15"
      class="scrollbar"
    />
    <ArrowButton
      :color="generalSettings.textColor"
      :size="20"
      @click="$emit('scroll-down')"
      direction="down"
      class="down-button"
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
