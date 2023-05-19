export default (serverData) => ({
  username: serverData?.username || '',
  status: serverData?.status || 'enabled',
})
