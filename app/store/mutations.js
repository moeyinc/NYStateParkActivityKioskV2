export default {
  updateGeneralSettings (state, generalSettings) {
    state.generalSettings = generalSettings;
  },
  updateActivities (state, activities) {
    if (checkIfActivitiesAreUpdated(state.activities, activities)) {
      // console.log('activities updated');
      state.activities = activities;
      state.selectedActivityId = activities[0].id;
    } else {
      console.log('activities not updated');
    }
  },
  updateActivityColors (state, activityColors) {
    state.activityColors = activityColors;
  },
  selectActivity (state, id) {
    state.selectedActivityId = id;
  },
  updateIsFirstSideNavItemActive (state, value) {
    state.isFirstSideNavItemActive = value;
  },
  updateIsSpanishEnabled (state, value) {
    state.isSpanishEnabled = value;
  },
};

function checkIfActivitiesAreUpdated (oldActivities, newActivities) {
  if (!oldActivities) return true;

  // check if the number of activities are same and contained ids are identical
  if (!shallowEqual(oldActivities, newActivities)) return true;

  for (const na of newActivities) {
    const oa = oldActivities.find((a) => a.id === na.id);
    // check if the number of tab items are same and contained ids are identical
    if (!shallowEqual(na.tabItems, oa.tabItems)) return true;

    // check if every corresponding activity has the same updatedAt timestamp
    if (na.updatedAt !== oa.updatedAt) return true;
    for (const nti of na.tabItems) {
      const oti = oa.tabItems.find((ti) => ti.id === nti.id);
      if (nti.updatedAt !== oti.updatedAt) return true;
    }
  }
  return false;
}

// both arrays have the same number of obejcts with identical ids
function shallowEqual (arrayA, arrayB) {
  const setA = new Set();
  const setB = new Set();
  arrayA.forEach((el) => setA.add(el.id));
  arrayB.forEach((el) => setB.add(el.id));
  const diff = difference(setA, setB);
  return diff.size === 0;
}

function difference (setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  }
  return _difference;
}
