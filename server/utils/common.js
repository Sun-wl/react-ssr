

export const componentName = 'react-ssr'

export const ifProd = (prodArg = true, notProdArg) =>
  process.env.NODE_ENV === 'production' ? prodArg : notProdArg

export const getClientBundlePath = () => '/js'

