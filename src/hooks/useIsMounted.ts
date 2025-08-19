import { useEffect, useState } from "react"

/**
 * Returns `true` once the component has mounted.
 * Useful for guarding code that should only run client-side.
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
