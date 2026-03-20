import { useEffect, useState, type ComponentType } from 'react'

type AgentationComponent = ComponentType

export function AgentationDevtool() {
  const [Agentation, setAgentation] = useState<AgentationComponent | null>(null)

  useEffect(() => {
    if (import.meta.env.PROD) {
      return
    }

    let mounted = true

    void import('agentation')
      .then((mod) => {
        if (mounted) {
          setAgentation(() => mod.Agentation)
        }
      })
      .catch(() => {
        // Ignore if the devtool package is unavailable.
      })

    return () => {
      mounted = false
    }
  }, [])

  if (import.meta.env.PROD || !Agentation) {
    return null
  }

  return <Agentation />
}
