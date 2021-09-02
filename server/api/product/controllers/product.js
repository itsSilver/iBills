'use strict'
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async lowData(ctx) {
    let entities

    if (ctx.query._q) {
      entities = await strapi.services.product.search(ctx.query)
    } else {
      entities = await strapi.services.product.find(ctx.query)
    }

    return entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.product,
      })

      if (lowData.category) {
        lowData.category = lowData.category.name
      }
      if (lowData.supplier) {
        lowData.supplier = lowData.supplier.name
      }
      if (lowData.unit) {
        delete lowData.unit
      }
      if (lowData.location) {
        lowData.location = lowData.location.name
      }
      if (lowData.vat) {
        lowData.vat = lowData.vat.tax_value
      }
      if (lowData.created_at) {
        delete lowData.created_at
      }
      if (lowData.updated_at) {
        delete lowData.updated_at
      }

      // if (lowData.min_qty) {
      //   delete lowData.min_qty
      // }
      // if (lowData.max_qty) {
      //   delete lowData.max_qty
      // }
      if (lowData.qty_package) {
        delete lowData.qty_package
      }
      if (lowData.note) {
        delete lowData.note
      }
      return lowData
    })
  },
  async findOne(ctx) {
    const { id } = ctx.params

    let entity = await strapi.services.product.findOne({ id })

    if (entity.category) {
      entity.category = entity.category.name
    }

    if (entity.vat) {
      entity.vat = entity.vat.tax_value
    }

    if (entity.unit) {
      entity.unit = entity.unit.name
    }
    if (entity.location) {
      entity.location = entity.location.name
    }
    if (entity.supplier) {
      entity.supplier = entity.supplier.name
    }

    return sanitizeEntity(entity, { model: strapi.models.product })
  },
}
