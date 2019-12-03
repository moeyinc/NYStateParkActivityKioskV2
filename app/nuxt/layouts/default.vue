<template>
  <div
    v-if="generalSettings && activities && activityColors"
    :style="{
      backgroundColor: generalSettings.backgroundColor,
      color: generalSettings.textColor,
    }"
    @click="displayRipple"
    class="default-layout"
  >
    <nuxt class="page" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import rippleMixin from '@/mixins/ripple-mixin';

export default {
  mixins: [rippleMixin],
  computed: {
    ...mapState(['generalSettings', 'activities', 'activityColors']),
  },
  created () {
    this.fetchGeneralSettings();
    this.fetchActivities();
    this.fetchActivityColors();
  },
  methods: {
    ...mapActions(['fetchGeneralSettings', 'fetchActivities', 'fetchActivityColors']),
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
