'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { type ComponentProps } from 'react'

interface SparkleProps {
  color?: string
  size?: number
  style?: React.CSSProperties
}

const DEFAULT_COLOR = "rgb(255, 220, 100)"

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

const useRandomInterval = (callback: () => void, minDelay: number | null, maxDelay: number | null) => {
  const timeoutId = React.useRef<number | null>(null)
  const savedCallback = React.useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (minDelay !== null && maxDelay !== null) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }
    return () => {
      if (timeoutId.current) {
        window.clearTimeout(timeoutId.current)
      }
    }
  }, [minDelay, maxDelay])
}

const Sparkle = ({ color = DEFAULT_COLOR, size = 10, style }: SparkleProps) => {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z'

  return (
    <span
      className="absolute block animate-sparkle-fade"
      style={{
        ...style,
        pointerEvents: 'none',
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg
        className="absolute animate-sparkle-spin"
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 68 68"
        fill="none"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  )
}

const generateSparkle = (color: string = DEFAULT_COLOR) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: `${random(-20, 60)}%`,
      left: `${random(-20, 80)}%`,
      zIndex: 2
    },
  }
}

interface SparklesProps {
  children: React.ReactNode
  className?: string
  color?: string
  enabled?: boolean
}

export const Sparkles = dynamic<ComponentProps<typeof import('./SparklesImpl.jsx').default>>(
  () => import('./SparklesImpl.jsx'),
  {
    ssr: false
  }
)

export const SparklesImpl = ({ children, className, color = DEFAULT_COLOR, enabled = true }: SparklesProps) => {
  const [mounted, setMounted] = useState(false)
  const [sparkles, setSparkles] = useState<ReturnType<typeof generateSparkle>[]>([])

  useEffect(() => {
    setMounted(true)
    if (enabled) {
      setSparkles([...Array(3)].map(() => generateSparkle(color)))
    }
  }, [color, enabled])

  useRandomInterval(
    () => {
      if (!mounted) return
      const now = Date.now()
      const sparkle = generateSparkle(color)
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    enabled && mounted ? 50 : null,
    enabled && mounted ? 450 : null
  )

  if (!mounted) {
    return <span className={cn("inline-block relative", className)}>{children}</span>
  }

  return (
    <span className={cn("inline-block relative", className)}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <span className="relative z-1">{children}</span>
    </span>
  )
}
