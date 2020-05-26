import React from "react"
import styled from "@emotion/styled"

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
`

const Image = styled.img`
  width: 100%;
  height: 240px;
  margin: 0;
  object-fit: none;
  object-position: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const CardBody = styled.div`
  margin: 0;
  padding: 16px;
`

type ImageCardProps = {
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, children }) => (
  <Wrapper>
    <Image src={src} alt={alt} />
    <CardBody>{children}</CardBody>
  </Wrapper>
)

export default ImageCard
