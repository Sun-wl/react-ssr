import React from 'react'
import { Router, Redirect } from '@reach/router'
import { useSelector } from 'react-redux'
import './index.css'
import ErrorBoundary from './components/common/ErrorBoundary'
import AppRoute from './components/common/AppRoute'
import { getError } from './redux/selector/app'

const ServerError = React.lazy(() => import('./screens/error'))
const Demo = React.lazy(() => import('./screens/demo'))
const Home = React.lazy(() => import('./screens/home'))
const Money = React.lazy(() => import('./screens/money'))

const NotFound = () => <Redirect from="" to="/home" noThrow />

function App() {
  const error = useSelector(getError)

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      {
        error
          ? <ServerError />
          : (
            <ErrorBoundary FallbackComponent={<ServerError />}>
              <Router>
                <Home path="/home" />
                <AppRoute component={Demo} path="demo" />
                <AppRoute component={Home} path="home" />
                <AppRoute component={Money} path="money" />
                <NotFound default />
              </Router>
            </ErrorBoundary>
          )
      }
    </React.Suspense>
  )
}

export default App
