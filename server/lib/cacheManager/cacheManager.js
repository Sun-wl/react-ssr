class CacheManager {
  constructor({ store }) {
    this.store = store
  }
  async get(req, key, loader, payload, options = {}) {
    const value = await this.store.get(req, key)
    if (value) {
      // eslint-disable-next-line no-console
      console.log(`get data from cache [${key}]`)
      return value
    }
    const data = await loader(req, payload)
    const { ttl } = options
    await this.store.set(req, key, data, ttl)
    return data
  }
}

export default CacheManager