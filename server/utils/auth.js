export const clearCookieSession = (req, res) => {
  req.session.destroy()
  res.clearCookie('gsid', { path: '/' })
}