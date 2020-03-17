import Vue from 'vue';
import urljoin from 'url-join';

Vue.prototype.$sortByOrder = (a, b) => {
  if (typeof a.order !== 'number' || typeof b.order !== 'number') return 0;
  if (a.order > b.order) {
    return 1;
  } else if (a.order < b.order) {
    return -1;
  } else {
    return 0;
  }
};

Vue.prototype.$getFileURL = (filename) => {
  return urljoin(process.env.MEDIA_URL, filename);
};
