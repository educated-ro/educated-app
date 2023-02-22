import { useState } from 'react'
import { useAnimationFrame } from 'framer-motion'

export default function useGaugeLoadingAnimation(maxValue = 100) {
  const [value, setValue] = useState(0)

  useAnimationFrame(t => {
    if (value >= maxValue) return
    setValue(Math.floor((t / 5500) * 100))
  })

  return {
    value: Math.min(value, maxValue),
  }
}
