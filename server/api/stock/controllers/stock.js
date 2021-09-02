'use strict'

const { sanitizeEntity } = require('strapi-utils')

module.exports = {
  async find(ctx) {
    let entities

    entities = await strapi.services.stock.find(ctx.query, [
      'product',
      'product.unit',
    ])
    const result = []
    entities.reduce(function (res, value) {
      if (!res[value.product.id]) {
        res[value.product.id] = {
          product: value.product.id,
          qty: 0,
        }
        result.push(res[value.product.id])
      }
      res[value.product.id].product = value.product
      res[value.product.id].qty += value.qty
      res[value.product.id].warehouse = value.warehouse
      return res
    }, {})
    let sale = result.map((e) => {
      return e.product.sale * e.qty
    })
    let cost = result.map((e) => {
      return e.product.cost * e.qty
    })
    let totalSale = sale.reduce((a, b) => a + b, 0)
    let totalPrice = cost.reduce((a, b) => a + b, 0)
    return {
      totalCost: totalPrice,
      totalSale: totalSale,
      data: result,
    }
  },
  async lowStock(ctx) {
    let entities

    entities = await strapi.services.stock.find(ctx.query, [
      'product',
      'product.unit',
      'warehouse',
    ])

    let entity = entities.map((entity) => {
      let stock = sanitizeEntity(entity, { model: strapi.models.stock })

      if (!stock.product.min_qty) {
        stock.product.min_qty = 10
      }

      return stock
    })
    const result = []
    entity.reduce(function (res, value) {
      if (!res[value.product.id]) {
        res[value.product.id] = {
          product: value.product.id,
          qty: 0,
        }
        result.push(res[value.product.id])
      }
      res[value.product.id].product = value.product
      res[value.product.id].qty += value.qty
      res[value.product.id].warehouse = value.warehouse.name
      return res
    }, {})

    const filtered = result.filter((el) => el.qty < el.product.min_qty)
    return filtered
  },
  async inventory(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.stock.search(ctx.query)
    } else {
      entities = await strapi.services.stock.find(ctx.query, [
        'product',
        'product.unit',
      ])
    }

    let entity = entities.map((entity) => {
      let stock = sanitizeEntity(entity, { model: strapi.models.stock })

      if (stock.warehouse) {
        delete stock.warehouse
      }

      if (stock.product) {
        stock.product.unit = stock.product.unit.abbv
      }

      return stock
    })

    let sale = entity.map((e) => {
      return e.product.sale * e.qty
    })
    let cost = entity.map((e) => {
      return e.product.cost * e.qty
    })
    let totalSale = sale.reduce((a, b) => a + b, 0)
    let totalPrice = cost.reduce((a, b) => a + b, 0)
    return {
      totalCost: totalPrice,
      totalSale: totalSale,
      data: entity,
    }
  },
}
