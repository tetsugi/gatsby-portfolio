import { StaticQuery, graphql } from "gatsby"
import React from "react"
import ReactHelmet, { HelmetProps as ReactHelmetProps } from "react-helmet"
import type { HelmetQuery } from "types/graphql"

type HelmetProps = {
  description?: string;
} & ReactHelmetProps

export const helmetQuery = graphql`
  query Helmet {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const Helmet: React.FC<HelmetProps> = ({
  title = "",
  description = "",
  meta = [],
  link = [],
  children,
  ...props
}) => (
  <StaticQuery
    query={ helmetQuery }
    render={({ site }: HelmetQuery) => {
      const { siteMetadata } = site ?? {}

      return (
        <ReactHelmet
          {...props}
          htmlAttributes={{ lang: "ja" }}
          title={
            title
              ? `${title} | ${siteMetadata?.title}`
              : siteMetadata?.title || "empty title"
          }
          meta={[
            ...meta,
            {
              name: "description",
              content: description || siteMetadata?.description,
            } as JSX.IntrinsicElements["meta"],
          ]}
          link={[
            ...link,
            {
              rel: "icon",
              href: "/favicon.ico",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "192x192",
              href: "/favicons/android-chrome-192x192.png",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "512x512",
              href: "/favicons/android-chrome-512x512.png",
            },
            {
              rel: "apple-touch-icon",
              sizes: "180x180",
              href: "/favicons/apple-touch-icon.png",
            },
          ]}
        >
          {children}
        </ReactHelmet>
      )
    }}
  />
)

export default Helmet
