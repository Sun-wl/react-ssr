// const Jasypt = require('jasypt')

export default (() => {
  const requireConfig = () => {
    return require('./config.json')
  }
  const config = requireConfig()
  // Spring Boot 集成 jasypt 对配置项进行加密，为了与 Java 体系保持一致，这里需要使用 jasypt
  // const jasypt = new Jasypt()
  // if(!process.env.CONFIG_ENCRYPTION_SECRET){
  //   throw new Error('Not set env CONFIG_ENCRYPTION_SECRET')
  // }
  // jasypt.setPassword(process.env.CONFIG_ENCRYPTION_SECRET)
  // jasypt.decryConfig(config)
  return config
})()