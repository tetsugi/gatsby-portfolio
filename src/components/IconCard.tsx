import { css } from "@emotion/core"
import React from "react"

import { useBreakpoint } from "@/hooks/useBreakpoint"
import Card from "./Card"

type IconCardProps = {
  src: string;
  alt: string;
}

const IconCard: React.FC<IconCardProps> = ({ src, alt, children }) => {
  const isSmall = useBreakpoint("sm")
  const size = isSmall ? 96 : 128

  return (
    <Card
      css={css`
        display: flex;
        flex-direction: ${ isSmall ? "column" : "row" };
        align-items: center;
      `}
    >
      <img
        src={src}
        alt={alt}
        css={css`
          margin-bottom: ${ isSmall ? "16px" : 0 };
          width: ${size}px;
          height: ${size}px;
          border-radius: 8px;
        `}
      />
      {children}
    </Card>
  )
}

export default IconCard
