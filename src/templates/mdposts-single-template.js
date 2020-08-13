import React from "react";
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "components/layout";

const MdpostTemplate = ({ data }) => {
    return (
        <Layout>
            <div className="container" style={{
                paddingTop: 30
            }}>
                <h1>
                    {data.markdownRemark.frontmatter.title}
                </h1>

                {data.markdownRemark.frontmatter.image ?
                    <Img fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid} style={{
                        marginBottom: 30
                    }} />
                    :
                    ``
                }

                <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
            </div>
        </Layout >
    )
}

export default MdpostTemplate

export const pageQuery = graphql`
query MdPostQuery($id: String!) {
    markdownRemark(id:  {eq: $id}) {
        id
        html
        frontmatter {
            title
            image {
                childImageSharp {
                    fluid(maxWidth: 1250) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        fields {
            slug
        }
    }
}
`