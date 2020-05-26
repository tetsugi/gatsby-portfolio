import { Link } from "gatsby"
import { css } from "@emotion/core"
import React from "react"

export type LinkButtonProps = {
  to: string;
  color?: string;
  backgroundColor?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, children, color = "white", backgroundColor = "transparent" }) => (
  <Link
    to={to}
    activeStyle={{
      color: "#61dafb",
    }}
    css={css`
      display: flex;
      align-items: center;
      color: ${color};
      background-color: ${backgroundColor};
      border: none;
      padding: 0 16px;
      font-family: "Play";
      font-weight: bold;
      text-decoration: none;
    `}
  >
    { children }
  </Link>
)

export default LinkButton
