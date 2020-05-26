/* eslint-disable @typescript-eslint/camelcase */
import { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Tetsugi Portfolio",
    description: "ITエンジニア、てつぎのポートフォリオサイトです。Kotlinが好きですが、TypeScriptをよく使っています。",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "posts/",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          "gatsby-remark-external-links",
          "gatsby-remark-emoji",
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: "types/graphql.d.ts",
        documentPaths: [
          "./src/**/*.{ts,tsx}",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Tetsugi Portfolio",
        short_name: "Tetsugi",
        start_url: "/",
        background_color: "#0f0f19",
        theme_color: "#677080",
        display: "standalone",
        legacy: false,
        cache_busting_mode: "none",
        icons: [
          {
            sizes: "180x180",
            type: "image/png",
            src: "favicons/apple-touch-icon.png",
          },
          {
            sizes: "192x192",
            type: "image/png",
            src: "favicons/android-chrome-192x192.png",
          },
          {
            sizes: "512x512",
            type: "image/png",
            src: "favicons/android-chrome-512x512.png",
          },
        ],
      },
    },
    "gatsby-plugin-offline",
  ],
}

export default config
