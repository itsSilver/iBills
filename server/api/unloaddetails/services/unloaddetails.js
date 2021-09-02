'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async createAll(ctx) {
    let unloaddetails = await strapi.services.unloaddetails.create(ctx)
    var payload = {
      qty: -ctx.qty,
      product: ctx.product,
      warehouse: ctx.warehouse,
      date: new Date(),
      document_id: unloaddetails.id,
    }
    await strapi.query('stock').create(payload)
  },
  async deleteAll(ctx) {
    var payload = {
      qty: -ctx.qty,
      product: ctx.product,
      warehouse: ctx.warehouse,
      document_id: ctx.id,
    }
    let stocku = await strapi.services.stock.checkStock(payload)
    if (stocku) {
      await strapi.query('stock').delete({ id: stocku.id })
    }
    let toDelete = await strapi.services.unloaddetails.delete({ id: ctx.id })
    return toDelete
  },
}
