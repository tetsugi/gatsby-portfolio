import { HEADER_HEIGHT } from "@/utils/dimens"
import LinkButton, { LinkButtonProps } from "@/components/LinkButton"
import React from "react"
import styled from "@emotion/styled"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition, faBook, faEnvelope, faHammer, faHome, faUser } from "@fortawesome/free-solid-svg-icons"
import { useBreakpoint } from "@/hooks/useBreakpoint"

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 0 16px;
  background-color: #20232a;
`

type ButtonProps = {
  icon?: IconDefinition;
} & LinkButtonProps

const Button: React.FC<ButtonProps> = ({ to, icon, children }) => {
  const isSmall = useBreakpoint("sm")

  return (
    <LinkButton to={to}>
      { isSmall && icon ? <FontAwesomeIcon icon={icon} /> : children }
    </LinkButton>
  )
}

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Button to="/" icon={faHome}>Home</Button>
      <Button to="/profile/" icon={faUser}>Profile</Button>
      <Button to="/works/" icon={faHammer}>Works</Button>
      <Button to="/posts/" icon={faBook}>Posts</Button>
      <Button to="/contact/" icon={faEnvelope}>Contact</Button>
    </StyledHeader>
  )
}

export default Header
