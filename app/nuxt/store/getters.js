export default {
  selectedActivity: (state) => {
    for (const activity of state.activities) {
      if (activity.id === state.selectedActivityId) {
        return activity;
      }
    }
    return null;
  },
  isFirstActivitySelected: (state) => {
    return state.activities[0].id === state.selectedActivityId;
  },
};
