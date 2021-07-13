<template>
  <main>
    <div :style="topLeftGapFillerStyle" class="top-left-gap-filler" />
    <div :style="baseStyle" class="base">
      <PageTitle
        :title="isSpanishEnabled ? selectedActivity.pageTitleInSpanish : selectedActivity.pageTitle"
        :icon-filename="selectedActivity.svgIcon && selectedActivity.svgIcon.filename"
      />
      <Binder />
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Binder from '@comps/detail/binder/Binder';
import PageTitle from './PageTitle';

export default {
  components: {
    PageTitle,
    Binder,
  },
  computed: {
    ...mapState(['selectedActivityId', 'activityColors', 'activities', 'isFirstSideNavItemActive', 'isSpanishEnabled']),
    ...mapGetters(['selectedActivity', 'selectedActivityColor']),
    isFirstActivitySelected () {
      return this.activities[0].id === this.selectedActivityId;
    },
    topLeftGapFillerStyle () {
      return {
        backgroundColor: this.isFirstSideNavItemActive ? 'white' : this.activityColors[0].mainColor,
      };
    },
    baseStyle () {
      return {
        backgroundColor: this.selectedActivityColor.mainColor,
        borderRadius: this.isFirstActivitySelected ? '0 20px 20px 20px' : '20px',
      };
    },
  },
};
</script>

<style scoped lang="stylus">
main
  position: absolute
  top: 0
  right: 0
  bottom: 0
  width: 1630px
  z-index: 100
  .top-left-gap-filler
    position: absolute
    width: 20px
    height: 20px
  .base
    z-index: 100
    position: absolute
    width: 100%
    height: 100%
    padding: 20px
</style>
