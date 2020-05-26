import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import Card from "./Card"
import Paragraph from "./Paragraph"
import React from "react"
import styled from "@emotion/styled"

const GridCard = styled(Card)`
  display: grid;
  grid-template:
    "image .. info       " auto
    "image .. ..........." 4px
    "image .. title      " auto
    "image .. ..........." 16px
    "image .. description" auto / 96px 16px 1fr;

  a, img, p, span {
    margin: 0;
  }

  .image {
    grid-area: image;
    width: 96px;
    height: 96px;
    border-radius: 4px;
  }

  .info {
    grid-area: info;
    display: flex;
    align-items: center;
  }
  .info .date {
    color: #999;
    font-size: 16px;
  }

  .title {
    grid-area: title;
  }

  .description {
    grid-area: description;
  }
`

type PostSummaryProps = Partial<{
  style: React.CSSProperties;
  to: string;
  image: string;
  title: string;
  description: string;
  date: string;
}>

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  opacity: 1;
  transition: opacity 0.3s ease;

  :hover {
    opacity: 0.7;
  }
`

const PostSummary: React.FC<PostSummaryProps> = ({
  style,
  to = "",
  image = "/img/no-image-96.png",
  title = "",
  description = "",
  date = "",
}) => (
  <GridCard style={style}>
    <PostLink className="image" to={to}>
      <img src={image} alt={`${title}のイメージ画像`} />
    </PostLink>

    <p className="info">
      <span className="date">
        <FontAwesomeIcon css={css` margin-right: 4px; `} icon={faCalendarAlt} />{date}
      </span>
    </p>

    <PostLink className="title" to={to}>
      <h3>{title}</h3>
    </PostLink>

    <Paragraph className="description">{description}</Paragraph>
  </GridCard>
)

export default PostSummary
