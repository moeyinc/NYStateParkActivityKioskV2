export default {
  selectedActivity: (state) => {
    return state.activities.find((activity) => activity.id === state.selectedActivityId);
  },
  selectedActivityColor: (state) => {
    let selectedActivityIndex = -1;
    state.activities.forEach((activity, index) => {
      if (activity.id === state.selectedActivityId) selectedActivityIndex = index;
    });
    const defaultColor = { mainColor: '', subColor: '' };
    return (selectedActivityIndex >= 0) ? state.activityColors[selectedActivityIndex] : defaultColor;
  },
  isFirstActivitySelected: (state) => {
    return state.activities[0].id === state.selectedActivityId;
  },
};
