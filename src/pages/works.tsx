import React from "react"
import styled from "@emotion/styled"

import ExternalLink from "@/components/ExternalLink"
import Helmet from "@/components/Helmet"
import ImageCard from "@/components/ImageCard"
import PaddingLayout from "@/layouts/PaddingLayout"
import Paragraph from "@/components/Paragraph"

const Subtitle = styled.h2`
  color: white;
  font-family: "Play";
  margin-top: 24px;
  margin-bottom: 8px;
`

const Description = styled(Paragraph)`
  color: white;
  margin-bottom: 16px;
`

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;

  > article {
    width: 288px;
    max-width: 448px;
    flex-grow: 1;
    margin-right: 16px;
    margin-bottom: 16px;

    @media screen and (max-width: 654px) {
      width: 100%;
      margin-right: 0;
      max-width: initial;
    }
  }
`

const Subheading: React.FC<{ href: string }> = ({ href, children }) => {
  const Heading = styled.h3`
    font-size: 1.1rem;
    margin-bottom: 8px;
  `

  const Link = styled(ExternalLink)`
    color: inherit;
    text-decoration: none;
    opacity: 1;
    transition: opacity 0.3s ease;

    :hover {
      opacity: 0.7;
    }
  `

  return (
    <Heading>
      <Link href={href}>{children}</Link>
    </Heading>
  )
}

const WorksPage: React.FC = () => (
  <PaddingLayout>
    <Helmet title="Works" description="管理人が業務や趣味で作った、公開できるプロダクトの一覧です。" />

    <Subtitle>Business</Subtitle>

    <Description>
      業務で携わったものです。公開できる範囲のみ。
    </Description>

    <Cards>
      <ImageCard src="/img/works/markdiff.jpg" alt="markdiff.js">
        <Subheading href="https://github.com/EimeeInc/markdiff.js">markdiff.js</Subheading>
        <Paragraph>
          MarkdownをHTMLに変換したもの同士の差分を取れる、Qiitaで使われているライブラリのTypeScript移植版。
        </Paragraph>
      </ImageCard>

      <ImageCard src="/img/works/elchika.jpg" alt="elchika">
        <Subheading href="https://elchika.com">elchika</Subheading>
        <Paragraph>
          Markdownで記事を投稿できる電子工作のナレッジ共有サービス。<del>どこかで似たようなのを聞いたことがあるような...</del>
        </Paragraph>
      </ImageCard>
    </Cards>

    <Subtitle>Hobby</Subtitle>

    <Description>
      プライベートの時間で製作したものです。ソースコードを<ExternalLink href="https://github.com/tetsugi/">GitHubで公開</ExternalLink>しています。
    </Description>

    <Cards>
      <ImageCard src="/img/works/gatsby-portfolio.jpg" alt="portfolio">
        <Subheading href="https://github.com/tetsugi/gatsby-portfolio">gatsby-portfolio</Subheading>
        <Paragraph>
          このポートフォリオ。主にReactとGatsbyの勉強用です。
        </Paragraph>
      </ImageCard>

      <ImageCard src="/img/works/gatsby-starter.jpg" alt="gatsby-starter-typescript-eslint">
        <Subheading href="https://github.com/tetsugi/gatsby-starter-typescript-eslint">gatsby-starter-typescript-eslint</Subheading>
        <Paragraph>
          TypeScriptでGatsbyを始めるときの（主に自分用の）テンプレート。
        </Paragraph>
      </ImageCard>

      <ImageCard src="/img/works/phaser3.jpg" alt="phaser3-electron-tutorial">
        <Subheading href="https://github.com/tetsugi/phaser3-electron-tutorial">phaser3-electron-tutorial</Subheading>
        <Paragraph>
          TypeScript + Electron + Phaser3製のぼくがかんがえたさいきょうのデスクトップゲーム開発環境のテンプレート。
        </Paragraph>
      </ImageCard>

      <ImageCard src="/img/works/js-99.jpg" alt="js-99">
        <Subheading href="https://github.com/tetsugi/js-99">js-99</Subheading>
        <Paragraph>
          Haskellの問題集を翻訳して作ったJavaScriptのアルゴリズムなどの問題集。
        </Paragraph>
      </ImageCard>
    </Cards>
  </PaddingLayout>
)

export default WorksPage
