import url from 'url'
import { getClientBundlePath } from '../utils/common'

const getManifest = async () => {
  const manifest = await import(/* webpackChunkName: "client-asset-manifest" */ '../config/client-asset-manifest.json');
  return manifest
}

const getLinkTag = ({ assetBaseUrl, manifest, assets }) => {
  if (!manifest) {
    console.log(`setupClientAssets: unable to find a manifest file at the path 'server/client/client-asset-manifest.json'`)
    return ''
  }
  return assets
    .filter(asset => asset.endsWith('.css'))
    .filter(asset => manifest?.assets?.[asset] && manifest?.assets?.[asset]?.path)
    .map(asset => url.resolve(assetBaseUrl, manifest.assets[asset].path))
    .map(href => `<link href="${href}" rel="stylesheet">`)
    .join('\n')
}

const getScriptTags = ({ assetBaseUrl, manifest, assets }) => {
  if (!manifest) {
    console.log(`setupClientAssets: unable to find a manifest file at the path 'server/client/client-asset-manifest.json', will use ${assetBaseUrl}bundle.js`)
    return `<script src="${assetBaseUrl}bundle.js" type="text/javascript"></script>`
  }

  return assets
    .filter(asset => asset.endsWith('.js'))
    .filter(asset => manifest.assets[asset] && manifest.assets[asset].path)
    .map(asset => url.resolve(assetBaseUrl, manifest.assets[asset].path))
    .map(src => `<script src="${src}" type="text/javascript"></script>`)
    .join('\n')
}

const getClientAssetTags = async () => {
  const manifest = await getManifest()
  const assets = ['main.js', 'main.css']
  const assetBaseUrl = `${getClientBundlePath()}/`

  const linkTags = getLinkTag({ assetBaseUrl, manifest, assets })
  const scriptTags = getScriptTags({ assetBaseUrl, manifest, assets })

  const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
  const headHTML = [
    `<script type="text/javascript">window.webpackPublicPath = '${assetBaseUrl}';</script>`,
    linkTags,
    isDev ? scriptTags : null,
  ]
    .filter(Boolean)
    .join('\n')
    .trim()

  const bodyHTML = [isDev ? null : scriptTags]
    .filter(Boolean)
    .join('\n')
    .trim()
  return { headHTML, bodyHTML }
}

export const setupClientAssets = async (req, res, next) => {
  const { headHTML, bodyHTML } = await getClientAssetTags()
  res.locals.customScripts = Object.assign({}, res.locals.customScripts, {
    headHTML,
    bodyHTML
  })
  next()
}