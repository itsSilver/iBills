'use strict'
const { defaultTo } = require('lodash')
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getCode(ctx) {
    let entities

    if (ctx.query._q) {
      entities = await strapi.services.sales.search(ctx.query)
    } else {
      entities = await strapi.services.sales.find(ctx.query)
    }
    if (entities.length !== 0) {
      let lastCodes = entities.map((entity) => {
        return entity.code
      })
      var last = lastCodes[lastCodes.length - 1]

      return sanitizeEntity(last, {
        model: strapi.models.sales,
      })
    } else {
      const newSales = await strapi.services.settings.find()
      return newSales.sales_code
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.sales.findOne({ id })
    let lowData = sanitizeEntity(entity, { model: strapi.models.sales })

    if (lowData.customer) {
      lowData.customer = lowData.customer.name
    }
    return lowData
  },
  async update(ctx) {
    const { id } = ctx.params

    let entity

    entity = await strapi.services.sales.update({ id }, ctx.request.body)

    let lowData = sanitizeEntity(entity, { model: strapi.models.sales })

    if (lowData.customer) {
      lowData.customer = lowData.customer.name
    }
    return lowData
  },
  async find(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.sales.search(ctx.query)
    } else {
      entities = await strapi.services.sales.find(ctx.query)
    }

    return entities.map((entity) => {
      let lowData = sanitizeEntity(entity, { model: strapi.models.sales })
      if (lowData.customer) {
        lowData.customer = lowData.customer.name
      }
      if (lowData.products.length !== 0) {
        let total = [lowData.products].flat()
        let sum = total.reduce(function (a, b) {
          return {
            total: a.total + b.total,
          }
        })
        lowData.total = sum.total
        lowData.products = lowData.products.length
      } else {
        lowData.products = 0
        lowData.total = 0
      }
      return lowData
    })
  },
  async create(ctx) {
    let entity

    entity = await strapi.services.sales.create(ctx.request.body)
    let sales = sanitizeEntity(entity, { model: strapi.models.sales })
    return sales
  },

  async delete(ctx) {
    const { id } = ctx.params
    let toDelete

    const entity = await strapi.services.sales.delete({ id })
    toDelete = sanitizeEntity(entity, { model: strapi.models.sales })
    return toDelete
  },
}
