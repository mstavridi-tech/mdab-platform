"use client"
import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number
  incrementY?: number
  incrementZ?: number
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={{ position: 'relative', width: '100%', perspective: '1000px', ...style }}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({ index, incrementY = 10, incrementZ = 10, children, style, ...props }, ref) => {
    const y = index * incrementY
    const z = index * incrementZ
    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          position: 'sticky',
          top: y,
          zIndex: z,
          backfaceVisibility: 'hidden',
          ...style,
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
