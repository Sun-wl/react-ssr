import React from "react";
import { Router, Redirect } from '@reach/router'
import ErrorBoundary from "./components/common/ErrorBoundary";
import AppRoute from "./components/common/AppRoute";
import './index.css'

const Demo = React.lazy(() => import('./screens/demo'))
const Home = React.lazy(() => import('./screens/home'))
const Money = React.lazy(() => import('./screens/money'))

const NotFound = () => <Redirect from="" to='/home' noThrow />

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>} >
      <ErrorBoundary FallbackComponent={<div>error...</div>}>
        <Router>
          <Home path="/home" />
          <AppRoute component={Demo} path="demo" />
          <AppRoute component={Home} path="home" />
          <AppRoute component={Money} path="money" />
          <NotFound default />
        </Router>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default App