'use strict'
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async nested(ctx) {
    let entities = await strapi.services.locations.find(ctx.query)

    const cleaned = entities.map((entity) => {
      const item = sanitizeEntity(entity, { model: strapi.models.locations })
      if (item.warehouse) {
        delete item.warehouse
      }
      return item
    })

    return this.nestChilds(cleaned)
  },

  nestChilds(object) {
    const list = []

    object.forEach((i) => {
      // If is related to parent
      if (i.parent) {
        // Scope that parent
        const parent = object.find(({ id }) => id === i.parent)

        // Add a child array property to that parent if not already done
        if (!parent.hasOwnProperty('children')) parent.children = []

        // Add current item to it's corresponding parent
        parent.children.push(i)

        // Remove parent property
        delete i.parent
      } else {
        list.push(i)
      }
    })
    return list
  },
  async parents(ctx) {
    let entities = await strapi.services.locations.find(ctx.query)

    const cleaned = entities.map((entity) => {
      const item = sanitizeEntity(entity, { model: strapi.models.locations })
      if (item.warehouse) {
        delete item.warehouse
      }
      return item
    })

    return this.onlyParents(cleaned)
  },

  onlyParents(object) {
    const list = []

    object.forEach((i) => {
      // If is related to parent
      if (i.parent !== null) {
        delete i.parent
      } else {
        list.push(i)
      }
    })
    return list
  },

  async children(ctx) {
    const { id } = ctx.params
    let entities

    if (ctx.query._q) {
      entities = await strapi.services.locations.search({
        ...ctx.query,
        'parent.id': id,
      })
    } else {
      entities = await strapi.services.locations.find({
        ...ctx.query,
        'parent.id': id,
      })
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.locations })
    )
  },

  async find(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.locations.search(ctx.query)
    } else {
      entities = await strapi.services.locations.find(ctx.query)
    }

    let entity = entities.map((entity) => {
      let lowData = sanitizeEntity(entity, {
        model: strapi.models.loaddetails,
      })
      if (lowData.created_at) {
        delete lowData.created_at
      }
      if (lowData.updated_at) {
        delete lowData.updated_at
      }
      delete lowData.warehouse

      return lowData
    })

    return entity
  },

  async transfer(ctx) {
    const { id } = ctx.params

    let loads = await strapi
      .query('loaddetails')
      .find({ 'product.location.id': id }, [
        'load',
        'product',
        'product.unit',
        'load.warehouse',
        'load.supplier',
      ])

    loads.forEach((e) => {
      e.type = 'load'
      e.warehouse = e.load.warehouse.name
      e.supplier = e.load.supplier.name
      delete e.load
      return e
    })
    let unloads = await strapi
      .query('unloaddetails')
      .find({ 'product.location.id': id }, [
        'unload',
        'product',
        'product.unit',
        'unload.warehouse',
        'unload.customer',
      ])
    unloads.forEach((e) => {
      e.type = 'unload'
      e.warehouse = e.unload.warehouse.name
      e.customer = e.unload.customer.name
      delete e.unload
      return e
    })
    let filtered = loads.concat(unloads)

    const sortedActivities = filtered.sort(
      (a, b) => b.created_at - a.created_at
    )

    return sortedActivities
  },
}
