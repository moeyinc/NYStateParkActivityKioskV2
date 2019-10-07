<template>
  <div
    class="default-layout"
    :style="{
      backgroundColor: generalSettings.backgroundColor.hex,
      color: generalSettings.textColor.hex,
    }"
  >
    <nuxt class="page" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['generalSettings', 'activities']),
  },
  created () {
    this.fetchGeneralSettings();
    this.fetchActivities();
  },
  methods: {
    ...mapActions(['fetchGeneralSettings', 'fetchActivities']),
  },
};
</script>

<style scoped lang="stylus">
.default-layout
  width: 1920px
  height: 1080px
  overflow: hidden
  .page
    position: relative
</style>
