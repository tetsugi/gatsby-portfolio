import { css } from "@emotion/core"
import React from "react"

import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoint"
import Layout from "./Layout"

const PaddingLayout: React.FC = ({ children }) => {
  const isMedium = useBreakpoint("md")

  return (
    <Layout>
      <div
        css={css`
          width: ${ isMedium ? "100%" : breakpoints["md"] + "px" };
          padding: 16px;
        `}
      >
        {children}
      </div>
    </Layout>
  )
}

export default PaddingLayout
