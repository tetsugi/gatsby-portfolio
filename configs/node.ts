import { Actions, GatsbyNode } from "gatsby"
import { Query } from "@@/types/graphql"
import { createFilePath } from "gatsby-source-filesystem"
import path from "path"

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(".", "src"),
        "@@": path.resolve("."),
        "types": path.resolve(".", "types"),
        ...(stage.startsWith("develop") ? {
          "react-dom": "@hot-loader/react-dom",
        } : {}),
      },
      extensions: [".ts", ".tsx"],
    },
  })
}

export const createSchemaCustomization = ({ actions: { createTypes } }: { actions: Actions }) => {
  createTypes(`
    type MarkdownRemark implements Node {
      fields: MarkdownRemarkFields
    }
    type MarkdownRemarkFields {
      slug: String!
    }
  `)
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === "MarkdownRemark") createNodeField({
    node,
    name: "slug",
    value: createFilePath({ node, getNode }),
  })
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql<Query>(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }  
    }
  `)

  // TODO: ts-nodeで実行されているときにOptional Chainingが使えない
  const { data } = result
  if (!data) return

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { fields } = node
    if (!fields) return

    createPage({
      path: `posts${fields.slug}` || "",
      component: path.resolve("src/templates/PostTemplate.tsx"),
      context: {
        slug: fields.slug || "",
      },
    })
  })
}
