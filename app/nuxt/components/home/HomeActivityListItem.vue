<template>
  <div
    class="home-activity-list-item"
    :style="buttonStyle"
  >
    <div class="inner">
      <simple-svg
        :src="require('@media/icons/' + activityIconFilename)"
      />
    </div>
  </div>
</template>

<script>
import activityMixin from '@/mixins/activityMixin';

export default {
  mixins: [activityMixin],
  props: {
    activity: {
      type: Object,
      default: null,
    },
    buttonWidth: {
      type: Number,
      default: 0,
    },
    buttonHeight: {
      type: Number,
      default: 0,
    },
    buttonMargin: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonStyle () {
      return {
        width: this.buttonWidth + 'px',
        height: this.buttonHeight + 'px',
        margin: this.buttonMargin,
        backgroundColor: this.activityMainColor,
      };
    },
  },
};
</script>

<style scoped lang="stylus">
.home-activity-list-item
  border-radius: 50px
</style>
