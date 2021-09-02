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

    if (sales) {
      let createUnload = {
        sale: sales.id,
        code: sales.code,
        date: sales.date,
        note: sales.note,
        customer: sales.customer,
        warehouse: sales.warehouse,
        reason: sales.reference,
        total: ctx.request.body.total,
      }
      let unload = await strapi.services.unload.create(createUnload)
      if (unload) {
        let details = sales.products
        if (details.length !== 0) {
          details.forEach((element) => {
            let payload = {
              qty: parseInt(element.qty),
              discount: element.discount,
              total: element.total,
              price: element.product.sale,
              product: element.product.id,
              warehouse: sales.warehouse,
              tax: element.product.vat,
              unload: unload.id,
            }
            return strapi.services.unloaddetails.createAll(payload)
          })
        }
      }
    }
    return sales
  },
  // async update(ctx) {
  //   const { id } = ctx.params

  //   let entity

  //   entity = await strapi.services.sales.update({ id }, ctx.request.body)

  //   let sales = sanitizeEntity(entity, { model: strapi.models.sales })
  //   let total = sales.products.reduce((a, b) => {
  //     return a.total + b.total
  //   })
  //   if (sales) {
  //     let createUnload = {
  //       sale: sales.id,
  //       code: sales.code,
  //       date: sales.date,
  //       note: sales.note,
  //       customer: sales.customer,
  //       warehouse: sales.warehouse,
  //       reason: sales.reference,
  //       total: total,
  //     }
  //     let unload = await strapi.services.unload.create(createUnload)
  //     if (unload) {
  //       let details = sales.products
  //       if (details.length !== 0) {
  //         details.forEach((element) => {
  //           let payload = {
  //             qty: parseInt(element.qty),
  //             discount: element.discount,
  //             total: element.total,
  //             price: element.product.sale,
  //             product: element.product.id,
  //             warehouse: sales.warehouse,
  //             tax: element.product.vat,
  //             unload: unload.id,
  //           }
  //           return strapi.services.unloaddetails.createAll(payload)
  //         })
  //       }
  //     }
  //   }
  //   return sales
  // },
  async delete(ctx) {
    const { id } = ctx.params
    let toDelete
    let unload = await strapi.services.unload.find({
      'sale.id': id,
    })
    if (unload.length !== 0) {
      let details = unload[0].unloaddetails
      if (details.length !== 0) {
        details.forEach((element) => {
          let payload = {
            qty: element.qty,
            product: element.product,
            warehouse: unload[0].warehouse.id,
            id: element.id,
          }
          return strapi.services.unloaddetails.deleteAll(payload)
        })
      }
      strapi.services.unload.delete({ id: unload[0].id })
    }
    const entity = await strapi.services.sales.delete({ id })
    toDelete = sanitizeEntity(entity, { model: strapi.models.sales })
    return toDelete
  },
}
