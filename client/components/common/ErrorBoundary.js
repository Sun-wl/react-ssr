import React from 'react'
import PropTypes from 'prop-types'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

const ErrorBoundary = ({ children, onError, FallbackComponent }) => (
  <ReactErrorBoundary onError={onError} FallbackComponent={FallbackComponent}>
    {children}
  </ReactErrorBoundary>
)

ErrorBoundary.defaultProps = {
  children: null,
  onError: null,
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  onError: PropTypes.func,
  FallbackComponent: PropTypes.any,
}

export default ErrorBoundary
