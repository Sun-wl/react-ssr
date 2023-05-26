import superagent from "superagent";
import superagentUse from 'superagent-use';

const Request = superagentUse(superagent)

Request.use(function (req) {
  req
    // .set('token', '')
    .set('X-Requested-With', 'XMLHttpRequest')
    .on('response', (res) => {
      if (res.statusCode === 302 && res?.body?.sessionExpired) {
        location.reload()
      }
    })
})

export { Request }