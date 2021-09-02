const removePasswords = (key, value) => (key === 'password' ? undefined : value)

const getContentType = (path) => {
  if (path.includes('service-request')) {
    return 'Service Request'
  }
  if (path.includes('register')) {
    return 'Account Registration'
  }
  if (path.includes('local')) {
    return 'Account Login'
  }
  if (path.includes('warehouse')) {
    return 'Warehouses'
  }
  if (path.includes('content-types') || path.includes('content-manager')) {
    return 'Admin'
  }
  return
}

const getActionType = (method, path) => {
  if (method.toLowerCase() === 'post' && path.includes('warehouses-request')) {
    return 'Created Service Request'
  }
  if (method.toLowerCase() === 'get' && path.includes('content-manager')) {
    return 'Admin content View'
  }
  if (method.toLowerCase() === 'post' && path.includes('content-manager')) {
    return 'Admin content create'
  }
  if (method.toLowerCase() === 'put' && path.includes('content-manager')) {
    return 'Admin content update'
  }
  if (method.toLowerCase() === 'post' && path.includes('register')) {
    return 'User Register'
  }
  if (method.toLowerCase() === 'post' && path.includes('local')) {
    return 'User log in'
  }
  if (method.toLowerCase() === 'post' && path.includes('warehouse')) {
    return 'Warehouse Create'
  }
  return
}

module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        await next()

        if (ctx.state && ctx.state.user) {
          const entry = {
            contentType: getContentType(ctx._matchedRoute),
            action: getActionType(ctx.request.method, ctx._matchedRoute),
            statusCode: ctx.response.status,
            author: {
              id: ctx.state.user.id,
              email: ctx.state.user.email,
              ip: ctx.request.ip,
            },
            method: ctx.request.method,
            route: ctx._matchedRoute,
            params: ctx.params,
            request: ctx.request.body,
            content: ctx.response.body,
          }
          if (
            (ctx.params.model && ctx.params.model.includes('trail')) ||
            (ctx.params.uid && ctx.params.uid.includes('trail'))
          ) {
            //Do nothing
          }

          if (ctx.request.method.toLowerCase() === 'post') {
            await strapi.query('trails').create(entry)
          }
        }
      })
    },
  }
}
