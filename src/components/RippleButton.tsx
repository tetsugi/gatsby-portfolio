import React from "react"
import Ripples from "react-ripples"
import styled from "@emotion/styled"

type StyledButtonProps = {
  color?: string;
  backgroundColor?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  color: ${({ color = "white" }) => color};
  background-color: ${({ backgroundColor = "transparent" }) => backgroundColor};
  border: none;
  padding: 0 16px;
  font-family: "Play";
  font-weight: bold;
`

type RippleButtonProps = {
  rippleColor?: string;
} & StyledButtonProps

const RippleButton: React.FC<RippleButtonProps> = ({ rippleColor = "rgba(255, 255, 255, .6)", children, ...styled }) => (
  <Ripples color={rippleColor}>
    <StyledButton {...styled}>{ children }</StyledButton>
  </Ripples>
)

export default RippleButton
