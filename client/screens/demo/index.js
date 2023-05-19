import React, { useEffect } from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { getStatus, getUsername } from '../../redux/selector/app'
import { getShowNotification } from '../../redux/selector/home'
import { disableUser } from '../../redux/actions/app'
import { enableNotification } from '../../redux/actions/home'

const Title = styled.div`
  font-size: 20px;
`

const Demo = () => {
  const dispatch = useDispatch()
  const username = useSelector(getUsername)
  const status = useSelector(getStatus)
  const showNotification = useSelector(getShowNotification)
  // eslint-disable-next-line no-console
  console.log(username, status, showNotification)
  useEffect(() => {
    dispatch(disableUser())
    dispatch(enableNotification())
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(username, status, showNotification)
    })
  })
  return (
    <>
      <Title>demo page</Title>
      <Link to="/money">link to money page</Link>
      <div>hello world</div>
    </>
  )
}

export default Demo
