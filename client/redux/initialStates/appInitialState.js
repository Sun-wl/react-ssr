export default (serverData) => ({
  error: serverData?.error,
  username: serverData?.username || '',
  status: serverData?.status || 'enabled',
  
})
