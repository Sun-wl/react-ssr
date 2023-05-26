import React, { Fragment, useEffect } from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { getStatus, getUsername } from '../../redux/selector/app'
import { getShowNotification } from '../../redux/selector/home'
import { disableUser } from '../../redux/actions/app'
import { enableNotification } from '../../redux/actions/home'
import * as demoRequest from '../../apis/demo'
import useAsync from '../../hooks/useAsync'
import { getDemoList } from '../../redux/selector/demo'

const Title = styled.div`
  font-size: 20px;
`

const Demo = () => {
  const dispatch = useDispatch()
  const username = useSelector(getUsername)
  const status = useSelector(getStatus)
  const showNotification = useSelector(getShowNotification)
  const demoList = useSelector(getDemoList)
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

  // 数据请求统一用 useAsync 的方式
  const { execute: addDemo } = useAsync(
    async () => {
      const payload = { name: 'ccc', value: 'ccc' }
      const { body: result } = await demoRequest.addDemo(payload)
      // eslint-disable-next-line no-console
      console.log(result)
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  )

  const handleClick = () => {
    addDemo()
  }

  return (
    <>
      <Title>demo page</Title>
      <Link to="/money">link to money page</Link>
      <div>hello world</div>
      {
        !!demoList?.length &&
        demoList.map(demo => {
          return (<Fragment key={demo?.name}>
            <div>{demo?.name}</div>
            <div>{demo?.value}</div>
          </Fragment>)
        })
      }
      <button onClick={handleClick}>点击这里提交请求</button>
    </>
  )
}

export default Demo
