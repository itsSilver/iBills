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
      entities = await strapi.services.load.search(ctx.query)
    } else {
      entities = await strapi.services.load.find(ctx.query)
    }

    return entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.load,
      })

      if (lowData.warehouse) {
        delete lowData.warehouse
      }
      if (lowData.supplier) {
        lowData.supplier = lowData.supplier.name
      }
      if (lowData.shipping_tax) {
        delete lowData.shipping_tax
      }
      if (lowData.shipping_cost) {
        delete lowData.shipping_cost
      }
      if (lowData.note) {
        delete lowData.note
      }
      if (lowData.created_at) {
        delete lowData.created_at
      }
      if (lowData.updated_at) {
        delete lowData.updated_at
      }
      if (lowData.loaddetails) {
        lowData.products = lowData.loaddetails.length
      }
      if (lowData.loaddetails) {
        delete lowData.loaddetails
      }
      return lowData
    })
  },
  async lastCode(ctx) {
    let entities

    if (ctx.query._q) {
      entities = await strapi.services.load.search(ctx.query)
    } else {
      entities = await strapi.services.load.find(ctx.query)
    }
    if (entities.length !== 0) {
      let lastCodes = entities.map((entity) => {
        return entity.code
      })
      var last = lastCodes[lastCodes.length - 1]

      return sanitizeEntity(last, {
        model: strapi.models.load,
      })
    } else {
      const newLoad = await strapi.services.settings.find()
      return newLoad.loads_code
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.load.findOne({ id })
    var cleaned = sanitizeEntity(entity, { model: strapi.models.load })
    if (cleaned.warehouse) {
      delete cleaned.warehouse
    }
    if (cleaned.created_at) {
      delete cleaned.created_at
    }
    if (cleaned.updated_at) {
      delete cleaned.updated_at
    }
    if (cleaned.loaddetails) {
      delete cleaned.loaddetails
    }

    if (cleaned.supplier) {
      cleaned.supplier = {
        id: cleaned.supplier.id,
        name: cleaned.supplier.name,
      }
    }
    return cleaned
  },

  async update(ctx) {
    const { id } = ctx.params

    let entity
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services.load.update({ id }, data, {
        files,
      })
    } else {
      entity = await strapi.services.load.update({ id }, ctx.request.body)
    }

    var cleaned = sanitizeEntity(entity, { model: strapi.models.load })
    if (cleaned.warehouse) {
      delete cleaned.warehouse
    }
    if (cleaned.created_at) {
      delete cleaned.created_at
    }
    if (cleaned.updated_at) {
      delete cleaned.updated_at
    }
    if (cleaned.loaddetails) {
      delete cleaned.loaddetails
    }

    if (cleaned.supplier) {
      cleaned.supplier = {
        id: cleaned.supplier.id,
        name: cleaned.supplier.name,
      }
    }
    return cleaned
  },
  async delete(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.load.delete({ id })
    if (entity) {
      if (entity.loaddetails.length > 0) {
        entity.loaddetails.forEach(async (element) => {
          strapi.services.loaddetails.delete({
            id: element.id,
          })
          const stock_payload = {
            product: element.product,
            warehouse: entity.warehouse.id,
            qty: element.qty,
            document_id: element.id,
          }
          let stocku = await strapi.services.stock.checkStock(stock_payload)

          if (stocku) {
            await strapi.query('stock').delete({ id: stocku.id })
          }
        })
      }
    }
    return sanitizeEntity(entity, { model: strapi.models.load })
  },
}
