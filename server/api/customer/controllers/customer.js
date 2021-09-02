'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  deleteAll: async (ctx) => {
    return await Promise.all(
      ctx.request.body.map((id) => strapi.services.customer.delete({ id: id }))
    )
  },
}
