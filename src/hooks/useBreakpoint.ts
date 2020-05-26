import { useMediaQuery } from "react-responsive"

type Size = "sm" | "md" | "lg"

type Mode = "under" | "over"

export const breakpoints: Record<Size, number> = {
  sm: 600,
  md: 960,
  lg: 1264,
}

export const useBreakpoint = (size: Size, mode: Mode = "under") => {
  switch (mode) {
    case "under": return useMediaQuery({ maxWidth: breakpoints[size] })
    case "over": return useMediaQuery({ minWidth: breakpoints[size] })
  }
}
