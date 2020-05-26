import { AnimatePresence, motion } from "framer-motion"
import { css } from "@emotion/core"
import React from "react"
import styled from "@emotion/styled"

import Header from "@/components/Header"

const duration = 0.25

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration },
  },
}

const FadeAnimation: React.FC<{ location?: Location }> = ({ children, location }) => (
  <AnimatePresence>
    <motion.main
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        width: 100%;
      `}
      key={location?.pathname}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.main>
  </AnimatePresence>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #0f0f19;
`

const Layout: React.FC = ({ children }) => (
  <Container>
    <Header />
    <FadeAnimation>{children}</FadeAnimation>
  </Container>
)

export default Layout
