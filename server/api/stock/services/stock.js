'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  checkStock(val) {
    return strapi.query('stock').findOne({
      'product.id': val.product,
      'warehouse.id': val.warehouse,
      document_id: val.document_id,
      qty: val.qty,
    })
  },
}
