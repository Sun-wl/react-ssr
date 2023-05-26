export const isXMLHttpRequest = (req) => {
  const requestedWith = req.headers['X-Requested-With'] || ''
  return requestedWith === 'XMLHttpRequest'
}