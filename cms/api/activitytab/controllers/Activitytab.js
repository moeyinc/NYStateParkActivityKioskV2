'use strict';

/**
 * Activitytab.js controller
 *
 * @description: A set of functions called "actions" for managing `Activitytab`.
 */

module.exports = {

  /**
   * Retrieve activitytab records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.activitytab.search(ctx.query);
    } else {
      return strapi.services.activitytab.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a activitytab record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.activitytab.fetch(ctx.params);
  },

  /**
   * Count activitytab records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.activitytab.count(ctx.query);
  },

  /**
   * Create a/an activitytab record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.activitytab.add(ctx.request.body);
  },

  /**
   * Update a/an activitytab record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.activitytab.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an activitytab record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.activitytab.remove(ctx.params);
  }
};
