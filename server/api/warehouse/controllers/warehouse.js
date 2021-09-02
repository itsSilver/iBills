'use strict'
const { parseMultipartData, sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  deleteAll: async (ctx) => {
    return await Promise.all(
      ctx.request.body.map((id) => strapi.services.warehouse.delete({ id: id }))
    )
  },
  async create(ctx) {
    let entity

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      data.users = ctx.state.user.id
      entity = await strapi.services.warehouse.create(data, { files })
    } else {
      ctx.request.body.users = ctx.state.user.id
      entity = await strapi.services.warehouse.create(ctx.request.body)
    }
    return sanitizeEntity(entity, { model: strapi.models.warehouse })
  },

  async update(ctx) {
    const { id } = ctx.params

    let entity

    // Find the warehouse matching the ID and the user
    const [warehouse] = await strapi.services.warehouse.find({
      id: ctx.params.id,
      'users.id': ctx.state.user.id,
    })

    if (!warehouse) {
      return ctx.unauthorized(`You can't update this entry`)
    }

    // Update the warehouse
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services.warehouse.update({ id }, data, {
        files,
      })
    } else {
      entity = await strapi.services.warehouse.update({ id }, ctx.request.body)
    }

    return sanitizeEntity(entity, { model: strapi.models.warehouse })
  },

  async find(ctx) {
    let entities

    if (ctx.query._q) {
      entities = await strapi.services.warehouse.search({
        ...ctx.query,
        'users.id': ctx.state.user.id,
      })
    } else {
      entities = await strapi.services.warehouse.find({
        ...ctx.query,
        'users.id': ctx.state.user.id,
      })
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.warehouse })
    )
  },

  async findOne(ctx) {
    const { id } = ctx.params

    const entity = await strapi.services.warehouse.findOne({
      id,
      'users.id': ctx.state.user.id,
    })

    if (!entity) {
      return ctx.unauthorized(`You can't view this entry`)
    }

    return sanitizeEntity(entity, { model: strapi.models.warehouse })
  },

  count(ctx) {
    if (ctx.query._q) {
      return strapi.services.warehouse.countSearch({
        ...ctx.query,
        'users.id': ctx.state.user.id,
      })
    }
    return strapi.services.warehouse.count({
      ...ctx.query,
      'users.id': ctx.state.user.id,
    })
  },
  /**
   * Delete a record
   *
   * @param {*} ctx the request context
   */
  async delete(ctx) {
    const [warehouse] = await strapi.services.warehouse.find({
      id: ctx.params.id,
      'users.id': ctx.state.user.id,
    })

    if (!warehouse) {
      return ctx.unauthorized(`You can't delete this entry`)
    }

    let entity = await strapi.services.warehouse.delete({ id: ctx.params.id })
    return sanitizeEntity(entity, { model: strapi.models.warehouse })
  },
}
