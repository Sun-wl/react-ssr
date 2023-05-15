import path from 'path'
import url from 'url'
import fs from 'fs'

const getManifest = () => {
  const manifestPath = '../../config/client-asset-manifest.json'
  if (!fs.existsSync(manifestPath)) {
    console.log(`setupClientAssets: unable to find a manifest file at the path ${manifestPath}`)
    return null
  }
  return require(manifestPath)
}

const getLinkTag = ({ assetBaseUrl, manifest, assets }) => {
  if (!manifest) {
    return ''
  }
  return assets
    .filter(asset => asset.endsWith('.css'))
    .filter(asset => manifest?.assets?.[asset] && manifest?.assets?.[asset]?.path)
    .map(asset => url.resolve(assetBaseUrl, manifest.assets[asset].path))
    .map(href => `<link href="${href}" ref="stylesheet">`)
    .join('\n')
}

const getScriptTags = ({ assetBaseUrl, manifest, assets }) => {
  if (!manifest) {
    return `<script src="/js/bundle.js" type="text/javascript"></script>`
  }
  return assets
    .filter(asset => asset.endsWith('.js'))
    .filter(asset => manifest.assets[asset] && manifest.assets[asset].path)
    .map(asset => url.resolve(assetBaseUrl, manifest.assets[asset].path))
    .map(src => `<script src="${src}" type="text/javascript"></script>`)
    .join('\n')
}

const getClientAssetTags = () => {
  const manifest = getManifest()
  const assets = ['main.js', 'main.css']
  const assetBaseUrl = 'js/'

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

export const setupClientAssets = (req, res, next) => {
  const { headHTML, bodyHTML } = getClientAssetTags()
  res.locals.customScripts = Object.assign({}, res.locals.customScripts, {
    headHTML,
    bodyHTML
  })
  next()
}