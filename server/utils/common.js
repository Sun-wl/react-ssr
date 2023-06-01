

export const componentName = 'react-ssr'

export const ifProd = (prodArg = true, notProdArg) =>
  process.env.NODE_ENV === 'production' ? prodArg : notProdArg

export const isDev = () =>
  process.env.NODE_ENV?.toLowerCase() === 'develop' || !process.env.NODE_ENV ? true : false

export const getClientBundlePath = () => '/js'

