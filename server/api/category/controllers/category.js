'use strict'
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  deleteAll: async (ctx) => {
    return await Promise.all(
      ctx.request.body.map((id) => strapi.services.category.delete({ id: id }))
    )
  },
  async nested(ctx) {
    let entities = await strapi.services.category.find(ctx.query)

    const cleaned = entities.map((entity) => {
      const item = sanitizeEntity(entity, { model: strapi.models.category })

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
    let entities = await strapi.services.category.find(ctx.query)

    const cleaned = entities.map((entity) => {
      const item = sanitizeEntity(entity, { model: strapi.models.category })

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
      entities = await strapi.services.category.search({
        ...ctx.query,
        'parent.id': id,
      })
    } else {
      entities = await strapi.services.category.find({
        ...ctx.query,
        'parent.id': id,
      })
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.category })
    )
  },
}
