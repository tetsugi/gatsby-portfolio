import React from "react"

import { css } from "@emotion/core"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import Card from "@/components/Card"
import IconCard from "@/components/IconCard"
import PaddingLayout from "@/layouts/PaddingLayout"
import Paragraph from "@/components/Paragraph"
import styled from "@emotion/styled"

const profile = `
都内でITエンジニアとして働いている「てつぎ」と申します。
KotlinとTypeScriptが好きです。最近はフロントエンド開発に興味があります💪

イラストやDDRを趣味にしています。DDRは足18中程度で停滞中……
こてこてのオタクなのでアニメや漫画も大好きです。

自分のスキルを活かしつつ技術力を向上できるような素敵な仕事を探しています。
面白いサービスを開発しているところがありましたら、ぜひ誘ってください✋✨
`.trim()

const Subheading = styled.h3`
  margin-top: 16px;
  margin-bottom: 8px;
`

const ProfilePage: React.FC = () => {
  const isMedium = useBreakpoint("md")

  return (
    <PaddingLayout>
      <IconCard src="/img/icon.jpg" alt="Tetsugiのプロフィール画像">
        <Paragraph
          css={css`
            flex-grow: 1;
            padding-left: ${ isMedium ? "0" : "16px" };
          `}
        >
          {profile}
        </Paragraph>
      </IconCard>

      <Card
        css={css`
          margin-top: 16px;
        `}
      >
        <h2>Skills</h2>

        <Subheading>Languages</Subheading>
        <Paragraph>JavaScript(ES2020), TypeScript, Kotlin, Java, C++, HTML5, CSS3(SCSS, PostCSS), SQL</Paragraph>

        <Subheading>Frontend</Subheading>
        <Paragraph>
          Vue.js, Nuxt.js, React(class-based, hooks), Storybook, GatsbyJS, Webpack
        </Paragraph>

        <Subheading>Backend</Subheading>
        <Paragraph>Node.js, Koa.js, Spring Framework(Spring Boot)</Paragraph>

        <Subheading>Client</Subheading>
        <Paragraph>
          Android, Electron
        </Paragraph>

        <Subheading>Database</Subheading>
        <Paragraph>PostgreSQL, MySQL, SQLite, Realm, Redis</Paragraph>

        <Subheading>Versioning</Subheading>
        <Paragraph>Git, Subversion</Paragraph>

        <Subheading>Infra</Subheading>
        <Paragraph>
          Docker, Kubernetes<br />
          GCP(GKE, Storage, Container Registry, DNS, SQL, Memorystore, Functions, Scheduler)<br />
          Netlify, GitHub(Pages, Actions, Packages), Algolia, Mailgun, Cloudinary
        </Paragraph>

        <Subheading>Others</Subheading>
        <Paragraph>
          LLVM<br />
          ArduinoやESP32などのマイコンプログラミング
        </Paragraph>

        <Subheading>Certifications</Subheading>
        <Paragraph>応用情報技術者, 高等学校教諭一種免許(情報), 準中型自動車免許</Paragraph>
      </Card>
    </PaddingLayout>
  )
}

export default ProfilePage
