import _ from 'lodash'
import serialize from 'serialize-javascript'

// res.locals.serverData is where you put any data that you want to send to the client
export const updateCustomServerData = (res, data) => {
  res.locals = res.locals || {}
  res.locals.serverData = res.locals.serverData || {}
  if (data && _.isObject(data)) {
    Object.assign(res.locals.serverData, data)
  }
}

export const getServerRenderData = (res) => {
  return {
    locals: {
      ...res.locals,
      // using serialize-javascript allows us to avoid XSS attacks
      serializedServerData: serialize(res?.locals?.serverData, {
        isJSON: true,
      }),
    },
  }
}
