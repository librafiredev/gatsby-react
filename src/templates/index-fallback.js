import React from "react"

import Layout from "components/layout"
import SEO from "components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container">
      <h1>This is a fallback homepage</h1>
      
      <p>This template is supposed to be used when "Your latest posts" is selected in wp dashboard.</p>
    </div>
  </Layout>
)

export default IndexPage