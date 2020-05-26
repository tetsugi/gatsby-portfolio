import { PostTemplateQuery } from "@@/types/graphql"
import { css } from "@emotion/core"
import { graphql } from "gatsby"
import Card from "@/components/Card"
import Helmet from "@/components/Helmet"
import PaddingLayout from "@/layouts/PaddingLayout"
import React from "react"
import styled from "@emotion/styled"

type PostProps = {
  data: PostTemplateQuery;
}

const ArticleBody = styled.div`
  padding: 8px;

  > * {
    margin-bottom: 24px;
  }

  p {
    white-space: pre-wrap;
  }

  code {
    word-break: break-word;
  }

  pre code {
    word-break: normal;
  }
`

const Post: React.FC<PostProps> = ({ data: { markdownRemark } }) => {
  const { html = "", frontmatter = {} } = markdownRemark ?? {}

  return (
    <PaddingLayout>
      <Helmet
        title={frontmatter?.title ?? ""}
        description={frontmatter?.description ?? ""}
      />

      <Card>
        <div css={css`
          text-align: center;
          margin-top: 16px;
          margin-bottom: 32px;

          h1 {
            margin-bottom: 24px;
            padding: 0 24px;
            word-break: break-word;
          }
        `}>
          <h1>{frontmatter?.title}</h1>
          <p>{frontmatter?.date}</p>
        </div>
        
        <ArticleBody dangerouslySetInnerHTML={{ __html: html as string }} />
      </Card>
    </PaddingLayout>
  )
}

export default Post

export const query = graphql`
  query PostTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        description,
        date(formatString: "YYYY年MM月DD日")
      }
    }
  }
`
