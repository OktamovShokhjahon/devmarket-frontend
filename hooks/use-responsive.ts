"use client"

import { useEffect, useState } from "react"

type Breakpoint = "mobile" | "tablet" | "laptop" | "desktop" | "tv"

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("laptop")
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth)

    // Update breakpoint based on width
    const updateBreakpoint = () => {
      const width = window.innerWidth
      setWidth(width)

      if (width < 768) {
        setBreakpoint("mobile")
      } else if (width >= 768 && width < 1025) {
        setBreakpoint("tablet")
      } else if (width >= 1025 && width < 1441) {
        setBreakpoint("laptop")
      } else if (width >= 1441 && width < 1921) {
        setBreakpoint("desktop")
      } else {
        setBreakpoint("tv")
      }
    }

    // Initial call
    updateBreakpoint()

    // Add event listener
    window.addEventListener("resize", updateBreakpoint)

    // Cleanup
    return () => window.removeEventListener("resize", updateBreakpoint)
  }, [])

  return {
    breakpoint,
    width,
    isMobile: breakpoint === "mobile",
    isTablet: breakpoint === "tablet",
    isLaptop: breakpoint === "laptop",
    isDesktop: breakpoint === "desktop",
    isTv: breakpoint === "tv",
    isSmallScreen: ["mobile", "tablet"].includes(breakpoint),
    isLargeScreen: ["laptop", "desktop", "tv"].includes(breakpoint),
  }
}
