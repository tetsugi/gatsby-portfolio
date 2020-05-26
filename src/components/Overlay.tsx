import React from "react"
import styled from "@emotion/styled"

type OverlayProps = {
  opacity: number | string;
  backgroundColor: string;
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const Scrim = styled.div<OverlayProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => props.backgroundColor};
`

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Overlay: React.FC<Partial<OverlayProps>> = ({
  opacity = 0.46,
  backgroundColor = "rgb(33, 33, 33)",
  children,
}) => (
  <Container>
    <Scrim opacity={opacity} backgroundColor={backgroundColor} />
    <Content>{children}</Content>
  </Container>
)

export default Overlay
