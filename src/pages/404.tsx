import React from "react"
import styled from "@emotion/styled"

import Layout from "@/layouts/Layout"

const Title = styled.h1`
  font-family: "Play";
  margin-top: 24px;
  color: white;
  text-align: center;
`

const NotFoundPage: React.FC = () => (
  <Layout>
    <Title>404 Not Found</Title>
  </Layout>
)

export default NotFoundPage
