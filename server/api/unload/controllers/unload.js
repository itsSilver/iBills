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
      entities = await strapi.services.unload.search(ctx.query)
    } else {
      entities = await strapi.services.unload.find(ctx.query)
    }

    return entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.unload,
      })

      if (lowData.warehouse) {
        delete lowData.warehouse
      }
      if (lowData.customer) {
        lowData.customer = lowData.customer.name
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
      if (lowData.unloaddetails) {
        lowData.products = lowData.unloaddetails.length
      }
      if (lowData.unloaddetails) {
        delete lowData.unloaddetails
      }
      return lowData
    })
  },
  async lastCode(ctx) {
    let entities

    if (ctx.query._q) {
      entities = await strapi.services.unload.search(ctx.query)
    } else {
      entities = await strapi.services.unload.find(ctx.query)
    }
    if (entities.length !== 0) {
      let lastCodes = entities.map((entity) => {
        return entity.code
      })
      var last = lastCodes[lastCodes.length - 1]

      return sanitizeEntity(last, {
        model: strapi.models.unload,
      })
    } else {
      const newLoad = await strapi.services.settings.find()
      return newLoad.unloads_code
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.unload.findOne({ id })
    var cleaned = sanitizeEntity(entity, { model: strapi.models.unload })
    if (cleaned.warehouse) {
      delete cleaned.warehouse
    }
    if (cleaned.created_at) {
      delete cleaned.created_at
    }
    if (cleaned.updated_at) {
      delete cleaned.updated_at
    }
    if (cleaned.unloaddetails) {
      delete cleaned.unloaddetails
    }

    if (cleaned.customer) {
      cleaned.customer = {
        id: cleaned.customer.id,
        name: cleaned.customer.name,
      }
    }
    return cleaned
  },

  async update(ctx) {
    const { id } = ctx.params

    let entity
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services.unload.update({ id }, data, {
        files,
      })
    } else {
      entity = await strapi.services.unload.update({ id }, ctx.request.body)
    }

    var cleaned = sanitizeEntity(entity, { model: strapi.models.unload })
    if (cleaned.warehouse) {
      delete cleaned.warehouse
    }
    if (cleaned.created_at) {
      delete cleaned.created_at
    }
    if (cleaned.updated_at) {
      delete cleaned.updated_at
    }
    if (cleaned.unloaddetails) {
      delete cleaned.unloaddetails
    }

    if (cleaned.customer) {
      cleaned.customer = {
        id: cleaned.customer.id,
        name: cleaned.customer.name,
      }
    }
    return cleaned
  },
  async delete(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.unload.delete({ id })
    if (entity) {
      if (entity.unloaddetails.length > 0) {
        entity.unloaddetails.forEach(async (element) => {
          strapi.services.unloaddetails.delete({
            id: element.id,
          })
          const stock_payload = {
            product: element.product,
            warehouse: entity.warehouse.id,
            qty: -element.qty,
            document_id: element.id,
          }
          let stocku = await strapi.services.stock.checkStock(stock_payload)
          if (stocku) {
            await strapi.query('stock').delete({ id: stocku.id })
          }
        })
      }
    }
    return sanitizeEntity(entity, { model: strapi.models.unload })
  },
}
