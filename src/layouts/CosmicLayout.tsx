import Loadable from "react-loadable"
import React from "react"
import styled from "@emotion/styled"

import { HEADER_HEIGHT } from "@/utils/dimens"
import Layout from "./Layout"
import Overlay from "@/components/Overlay"

const Container = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 100%;
  max-height: calc(100vh - ${HEADER_HEIGHT}px);
`

const LoadableCosmos = Loadable({
  loader: () => import("@/components/Cosmos"),
  loading: () => <div />,
})

const Content = styled.div`
  width: 100%;
  height: 100%;
`

const CosmosLayout: React.FC = ({ children }) => (
  <Layout>
    <Container>
      <LoadableCosmos />
      <Overlay>
        <Content>{children}</Content>
      </Overlay>
    </Container>
  </Layout>
)

export default CosmosLayout
