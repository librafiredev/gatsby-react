/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

import { GlobalStateContext } from "context/GlobalContextProvider"

import Header from "./header"

import { GlobalStyles, AllThemes } from "styles/GlobalStyles"

import "assets/scss/index.scss"

const SiteContent = styled.div`
padding-top: 80px;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const A = useContext(GlobalStateContext).theme;

  
  let currentTheme = AllThemes[A];

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <Header siteTitle={data.site.siteMetadata.title} />
        <SiteContent>

          <main>
            {children}
          </main>

          <footer style={{
            textAlign: `center`
          }}>
            <small>© {new Date().getFullYear()}, gatsby-react webtest</small>
          </footer>
        </SiteContent>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
