import { css } from "@emotion/core"
import React from "react"
import styled from "@emotion/styled"

import CosmicLayout from "@/layouts/CosmicLayout"
import Helmet from "@/components/Helmet"
import Typist from "react-typist"

const Wrapper = styled.article`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: white;
`

const Article = styled.article`
  width: 312px;
  height: 240px;
`

const Title = styled.h1`
  font-family: "Play";
`

const IndexPage: React.FC = () => (
  <CosmicLayout>
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
    </Wrapper>
  </CosmicLayout>
)

export default IndexPage
