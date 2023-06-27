export const isProd = (prodArg = true, notProdArg = false) =>
  process.env.NODE_ENV === 'production' ? prodArg : notProdArg

export const isDev = () =>
  process.env.NODE_ENV === 'development' ? true : false


