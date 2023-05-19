import React from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'

const Title = styled.div`
  font-size: 20px;
`

const Home = () => {
  return (
    <>
      <Title>home page</Title>
      <Link to="/money">link to money page</Link>
      <div>hello world</div>
    </>
  )
}

export default Home
