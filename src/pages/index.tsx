import { css } from "@emotion/core"
import React from "react"
import styled from "@emotion/styled"

import { HEADER_HEIGHT } from "@/utils/dimens"
import Helmet from "@/components/Helmet"
import Layout from "@/layouts/Layout"
import Loadable from "react-loadable"
import Typist from "react-typist"

const Wrapper = styled.article`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  align-items: center;
  justify-content: center;
  color: white;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  }
`

const Article = styled.article`
  width: 312px;
  height: 240px;
  z-index: 1;
`

const Title = styled.h1`
  font-family: "Play";
`

const ParticlesBg = Loadable({
  loader: () => import("particles-bg"),
  loading: () => <canvas />,
})

const IndexPage: React.FC = () => (
  <Layout>
    <Helmet />

    <Wrapper>
      <Article>
        <Title>Tetsugi Portfolio</Title>
        
        <Typist css={css`
          font-family: "Play";
          white-space: pre-wrap;
          word-break: break-word;
        `}>
          <Typist.Delay ms={500} />
          I&apos;m a full-stack engineer.
          <Typist.Backspace count={20} delay={100} />
          yowayowa IT engineer.
          <br />
          <Typist.Delay ms={500} />
          I&apos;m looking for a job where I can use my skills and make interesting apps!
          <br />
          <Typist.Delay ms={500} />
          I love Kotlin and TypeScript ❤
        </Typist>
      </Article>

      <ParticlesBg type="cobweb" color="#ffffff" />
    </Wrapper>
  </Layout>
)

export default IndexPage
