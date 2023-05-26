export const usePath = params => {
  const searchObj = {}
  if (params.search) {
    const searchParams = params.search.split('?')[1]
    const searchArr = searchParams.split('&')
    searchArr.map(item => {
      const query = item.split('=')
      searchObj[query[0]] = query[1]
    })
  }

  return {
    searchParams: searchObj
  }
}