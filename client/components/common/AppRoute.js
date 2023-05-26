import React from 'react'
import PropTypes from 'prop-types'

const AppRoute = ({ component: Component, ...rest }) => {
  return <Component {...rest} />
}

AppRoute.propTypes = {
  // component: PropTypes.node,
}

export default AppRoute
