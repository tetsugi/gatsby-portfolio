import { useEffect, useState } from "react"

export default () => {
  const isClient = typeof window === "object"

  const getSize = () => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  })

  const [size, setSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) return

    const resize = () => setSize(getSize())
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return size
}
