import { useCallback, useEffect, useRef, useState } from "react"

export default function useAsync(
  func,
  handleError,
  // 默认启用全屏 loading
  options = { disableFullPageLoading: false }
) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const funcRef = useRef(func)
  funcRef.current = func

  useEffect(() => {
    if (loading && !options?.disableFullPageLoading) {
      // 开启 loading
      // dispatch(startFullPageLoading())
    }

    if (!loading && !options?.disableFullPageLoading) {
      // 关闭 loading
      // dispatch(stopFullPageLoading())
    }

    return () => {
      // 关闭 loading
      // dispatch(stopFullPageLoading())
    }

  }, [loading])


  const execute = async (...params) => {
    setError(null)
    setLoading(true)

    return funcRef
      .current(...params)
      .then(res => {
        setData(res)
        return res
      })
      .catch(err => {
        setError(err)
        if (handleError) {
          handleError(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  return {
    execute,
    data,
    loading,
    error,
    reset,
  }
}