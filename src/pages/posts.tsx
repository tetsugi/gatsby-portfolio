import { graphql } from "gatsby"
import React from "react"

import { PostsPageQuery } from "@@/types/graphql"
import Helmet from "@/components/Helmet"
import PaddingLayout from "@/layouts/PaddingLayout"
import PostSummary from "@/components/PostSummary"

type PostsPageProps = {
  data: PostsPageQuery;
}

const PostsPage: React.FC<PostsPageProps> = ({ data }) => (
  <PaddingLayout>
    <Helmet title="Posts" description="管理人が業務や趣味などで経験したことをメモ代わりに記事にしたものです。" />

    {data.allMarkdownRemark.edges.map(({ node }, i) => (
      <PostSummary
        style={i ? { marginTop: "16px" } : {}}
        key={node.id}
        to={`/posts${node.fields?.slug}`}
        date={node.frontmatter?.date}
        title={node.frontmatter?.title ?? ""}
        description={node.frontmatter?.description ?? ""}
      />
    ))}
  </PaddingLayout>
)

export default PostsPage

export const query = graphql`
  query PostsPage {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "YYYY年MM月DD日")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
