/**
 * Grabs the data we dump from the server into the DOM and exports them as a singleton.
 * This allows us to conveniently dump server data into the dom and use this to load
 * that data into our app.
 */
// because the way webpack is implemented, you can import this file anywhere
// in the codebase like so:
// import serverData from 'utils/server-data'
const serverData = {}
function init() {
  const dataNode = document.getElementById('server-data')

  if (!dataNode) {
    console.error('There was now element with the id of server-data.')
    return
  }

  try {
    const serverDataString = dataNode.innerHTML
    Object.assign(serverData, JSON.parse(serverDataString))

    if (dataNode.parentElement) {
      dataNode.parentElement.removeChild(dataNode) // cleanup the DOM
    }
    if (process.env.NODE_ENV === 'development') {
      console.info('server-data loaded', serverData)
    }
  } catch (err) {
    console.error('server-data: load', err)
  }

}
init()
export default serverData
/* eslint no-console:0 */
