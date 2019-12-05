const { SETUP } = require('../config');
const access = require('../helpers/access-control');
const { Color, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

module.exports = {
  colorListConfig: {
    fields: {
      order: { type: Integer, isRequired: true },
      mainColor: { type: Color },
      subColor: { type: Color },
    },
    labelResolver: (item) => `Colors of Activity #${item.order}`,
    adminConfig: {
      defaultColumns: 'order, mainColor, subColor, updatedAt',
      defaultSort: 'order',
    },
    access: {
      read: true,
      update: Boolean(SETUP) || access.userIsAdmin,
      create: Boolean(SETUP) || access.userIsAdmin,
      delete: Boolean(SETUP) || access.userIsAdmin,
      auth: !Boolean(SETUP),
    },
    plugins: [
      atTracking(),
    ],
  },
  colorPresets: `[
    {
      data: {
        order: 1,
        mainColor: "rgba(183, 79, 89, 1)",
        subColor: "rgba(195, 135, 140, 1)",
      }
    },
    {
      data: {
        order: 2,
        mainColor: "rgba(171, 83, 96, 1)",
        subColor: "rgba(187, 138, 144, 1)",
      }
    },
    {
      data: {
        order: 3,
        mainColor: "rgba(144, 88, 110, 1)",
        subColor: "rgba(171, 140, 153, 1)",
      }
    },
    {
      data: {
        order: 4,
        mainColor: "rgba(108, 94, 128, 1)",
        subColor: "rgba(150, 143, 164, 1)",
      }
    },
    {
      data: {
        order: 5,
        mainColor: "rgba(64, 99, 143, 1)",
        subColor: "rgba(126, 146, 174, 1)",
      }
    },
    {
      data: {
        order: 6,
        mainColor: "rgba(53, 115, 140, 1)",
        subColor: "rgba(123, 156, 173, 1)",
      }
    },
    {
      data: {
        order: 7,
        mainColor: "rgba(45, 130, 135, 1)",
        subColor: "rgba(121, 166, 170, 1)",
      }
    },
    {
      data: {
        order: 8,
        mainColor: "rgba(30, 149, 128, 1)",
        subColor: "rgba(118, 179, 166, 1)",
      }
    },
    {
      data: {
        order: 9,
        mainColor: "rgba(8, 167, 117, 1)",
        subColor: "rgba(112, 190, 160, 1)",
      }
    },
    {
      data: {
        order: 10,
        mainColor: "rgba(116, 170, 97, 1)",
        subColor: "rgba(166, 194, 149, 1)",
      }
    },
    {
      data: {
        order: 11,
        mainColor: "rgba(162, 170, 80, 1)",
        subColor: "rgba(191, 195, 140, 1)",
      }
    },
    {
      data: {
        order: 12,
        mainColor: "rgba(199, 168, 62, 1)",
        subColor: "rgba(212, 194, 130, 1)",
      }
    },
    {
      data: {
        order: 13,
        mainColor: "rgba(238, 164, 36, 1)",
        subColor: "rgba(235, 192, 116, 1)",
      }
    },
    {
      data: {
        order: 14,
        mainColor: "rgba(206, 112, 36, 1)",
        subColor: "rgba(211, 157, 110, 1)",
      }
    },
    {
      data: {
        order: 15,
        mainColor: "rgba(175, 67, 36, 1)",
        subColor: "rgba(189, 126, 106, 1)",
      }
    },
  ]`,
};