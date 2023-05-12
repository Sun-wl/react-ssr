import React from "react";

const AppRoute = ({ component: Component, ...rest }) => {
  return (
    <Component {...rest} />
  )
}

export default AppRoute