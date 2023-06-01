import _ from "lodash";
import CacheManager from "./cacheManager";

const sessionStore = {
  get: (req, key) => {
    if (!req.session) {
      throw new Error('no req.session')
    }
    return _.get(req.session, key)
  },

  set: (req, key, data) => {
    return _.set(req.session, key, data)
  }
}

const sessionCache = new CacheManager({
  store: sessionStore
})
export default sessionCache