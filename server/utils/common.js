import path from 'path'

export const ifProd = (prodArg = true, notProdArg) => process.env.NODE_ENV === 'production' ? prodArg : notProdArg

export const cwd = process.cwd()

export const getClientBundlePath = () => '/js'

export const fromRoot = (...p) => path.join(cwd, ...p)

