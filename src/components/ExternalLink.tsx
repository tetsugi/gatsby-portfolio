import styled from "@emotion/styled"

const ExternalLink = styled.a`
  color: rgb(97, 218, 251);
`

ExternalLink.defaultProps = {
  target: "_blank",
  rel: "noopener noreferrer",
}

export default ExternalLink
