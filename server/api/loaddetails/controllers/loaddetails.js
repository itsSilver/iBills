'use strict'

const { sanitizeEntity } = require('strapi-utils')
const lodash = require('lodash')

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity

    const tolerance = ctx.request.body.cost_tolerance
    const price = ctx.request.body.price
    const qty = ctx.request.body.qty
    const max_qty = ctx.request.body.max_qty

    if (price > tolerance) {
      return ctx.badRequest({
        en: 'Price extends the price tolerance for this product set by admin!',
      })
    }
    if (max_qty) {
      if (qty > max_qty) {
        return ctx.send(
          {
            message: 'Max Qty extended',
          },
          415
        )
      }
    }
    entity = await strapi.services.loaddetails.create(ctx.request.body)

    let load_details = sanitizeEntity(entity, {
      model: strapi.models.loaddetails,
    })

    var payload = {
      product: load_details.product.id,
      warehouse: load_details.load.warehouse,
      qty: qty,
      date: new Date(),
      document_id: load_details.id,
    }
    await strapi.query('stock').create(payload)
    return load_details
  },
  async delete(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.loaddetails.delete({ id })

    let load_details = sanitizeEntity(entity, {
      model: strapi.models.loaddetails,
    })
    const stock_payload = {
      product: load_details.product.id,
      warehouse: load_details.load.warehouse,
      qty: load_details.qty,
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
      entities = await strapi.services.loaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.loaddetails.find(ctx.query)
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, { model: strapi.models.loaddetails })
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
      entities = await strapi.services.loaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.loaddetails.find(ctx.query, [
        'load',
        'load.supplier',
        'load.warehouse',
      ])
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.loaddetails,
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

      if (lowData.load) {
        lowData.supplier = {
          name: lowData.load.supplier.name,
          id: lowData.load.supplier.id,
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
  async alarms(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.loaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.loaddetails.find(ctx.query, [
        'load',
        'load.supplier',
        'load.warehouse',
        'product',
      ])
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.loaddetails,
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
        lowData.supplier = {
          name: lowData.load.supplier.name,
          id: lowData.load.supplier.id,
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
      entities = await strapi.services.loaddetails.search(ctx.query)
    } else {
      entities = await strapi.services.loaddetails.find(ctx.query, [
        'load',
        'load.supplier',
        'load.warehouse',
        'product',
      ])
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.loaddetails,
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

      if (lowData.load) {
        lowData.supplier = {
          name: lowData.load.supplier.name,
          id: lowData.load.supplier.id,
        }
        lowData.warehouse = {
          name: lowData.load.warehouse.name,
          id: lowData.load.warehouse.id,
        }
      }
      delete lowData.load

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
      dada = lodash.sumBy(element, 'qty')
      console.log('dada', dada)
    })

    // let total = lodash.sumBy(result, 'qty')

    return result
  },
}
