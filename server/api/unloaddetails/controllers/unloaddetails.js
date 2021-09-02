'use strict'

const { sanitizeEntity } = require('strapi-utils')

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity

    entity = await strapi.services.unloaddetails.create(ctx.request.body)

    let load_details = sanitizeEntity(entity, {
      model: strapi.models.unloaddetails,
    })

    var payload = {
      qty: -ctx.request.body.qty,
      product: ctx.request.body.product,
      warehouse: ctx.request.body.warehouse,
      date: new Date(),
      document_id: load_details.id,
    }
    await strapi.query('stock').create(payload)
    return load_details
  },
  async delete(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.unloaddetails.delete({ id })

    let load_details = sanitizeEntity(entity, {
      model: strapi.models.unloaddetails,
    })

    const stock_payload = {
      product: load_details.product.id,
      warehouse: load_details.unload.warehouse,
      qty: -load_details.qty,
      document_id: id,
    }
    let stocku = await strapi.services.stock.checkStock(stock_payload)
    if (stocku) {
      await strapi.query('stock').delete({ id: stocku.id })
    }
    return load_details
  },
  async findbylocation(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.unloaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.unloaddetails.find(ctx.query)
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.unloaddetails,
      })
      let product = lowData.product
      if (product) {
        lowData.code = product.code
        lowData.barcode = product.barcode
        lowData.name = product.name
        lowData.sale = product.sale
        lowData.id = product.id
      }
      if (lowData.load) {
        delete lowData.load
      }
      if (lowData.discount) {
        delete lowData.discount
      }
      if (lowData.product) {
        delete lowData.product
      }
      if (lowData.created_at) {
        delete lowData.created_at
      }
      if (lowData.updated_at) {
        delete lowData.updated_at
      }
      // if (lowData.total) {
      //   delete lowData.total
      // }

      return lowData
    })
    let price = entity.map((e) => {
      return e.total
    })
    let totalPrice = price.reduce((a, b) => a + b, 0)
    let sale = entity.map((e) => {
      return e.sale * e.qty
    })
    let totalSale = sale.reduce((a, b) => a + b, 0)
    return {
      totalCost: totalPrice,
      totalSale: totalSale,
      data: entity,
    }
  },
  async findbyproduct(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.unloaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.unloaddetails.find(ctx.query, [
        'unload',
        'unload.customer',
        'unload.warehouse',
      ])
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.unloaddetails,
      })

      if (lowData.discount) {
        delete lowData.discount
      }
      if (lowData.product) {
        delete lowData.product
      }
      if (lowData.created_at) {
        delete lowData.created_at
      }
      if (lowData.updated_at) {
        delete lowData.updated_at
      }
      // if (lowData.total) {
      //   delete lowData.total
      // }

      if (lowData.unload) {
        lowData.customer = {
          name: lowData.unload.customer.name,
          id: lowData.unload.customer.id,
        }
        lowData.warehouse = {
          name: lowData.unload.warehouse.name,
          id: lowData.unload.warehouse.id,
        }
      }
      delete lowData.unload

      return lowData
    })

    return entity
  },
  async alarms(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.unloaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.unloaddetails.find(ctx.query, [
        'unload',
        'unload.customer',
        'unload.warehouse',
        'product',
      ])
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.unloaddetails,
      })
      let product = lowData.product
      if (product) {
        lowData.code = product.code
        lowData.barcode = product.barcode
        lowData.name = product.name
        lowData.prod_id = product.id
      }
      if (lowData.discount) {
        delete lowData.discount
      }
      if (lowData.product) {
        delete lowData.product
      }
      if (lowData.created_at) {
        delete lowData.created_at
      }
      if (lowData.updated_at) {
        delete lowData.updated_at
      }
      // if (lowData.total) {
      //   delete lowData.total
      // }

      if (lowData.load) {
        lowData.customer = {
          name: lowData.load.customer.name,
          id: lowData.load.customer.id,
        }
        lowData.warehouse = {
          name: lowData.load.warehouse.name,
          id: lowData.load.warehouse.id,
        }
      }
      delete lowData.load

      return lowData
    })

    return entity
  },
  async lowstock(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.unloaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.unloaddetails.find(ctx.query, [
        'load',
        'load.customer',
        'load.warehouse',
        'product',
      ])
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.unloaddetails,
      })
      let product = lowData.product
      if (product) {
        lowData.code = product.code
        lowData.barcode = product.barcode
        lowData.name = product.name
        lowData.min_qty = product.min_qty
        lowData.prod_id = product.id
      }
      if (lowData.discount) {
        delete lowData.discount
      }
      if (lowData.product) {
        delete lowData.product
      }
      if (lowData.created_at) {
        delete lowData.created_at
      }
      if (lowData.updated_at) {
        delete lowData.updated_at
      }
      // if (lowData.total) {
      //   delete lowData.total
      // }

      if (lowData.unload) {
        lowData.customer = {
          name: lowData.unload.customer.name,
          id: lowData.unload.customer.id,
        }
        lowData.warehouse = {
          name: lowData.unload.warehouse.name,
          id: lowData.unload.warehouse.id,
        }
      }
      delete lowData.unload

      return lowData
    })
    let result = entity.reduce(function (r, a) {
      r[a.prod_id] = r[a.prod_id] || []
      r[a.prod_id].push(a)
      return r
    }, new Array())
    let dada
    result.forEach((element, index) => {
      // element.forEach((e) => {
      //   console.log('e', e)
      //   dada = lodash.sumBy(e, 'qty')
      //   console.log('🚀 ~ element.forEach ~ dada', dada)
      //   return dada
      // })
      console.log('dada', dada)
    })

    // let total = lodash.sumBy(result, 'qty')

    return result
  },
}
