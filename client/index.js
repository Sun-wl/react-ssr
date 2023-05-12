
document.addEventListener('DOMContentLoaded', () => {
  // this is the only `require` that should be in our app. Using `require` here
  // allows us to defer import resolution until after the DOMContentLoaded
  // event is fired.
  require('./render')
})
