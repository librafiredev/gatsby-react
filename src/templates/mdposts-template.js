import React from "react";
import { graphql, Link } from "gatsby"

import Layout from "components/layout";
import Pagination from "components/pagination";
import HeroSection from "components/hero-section";

const Mdpost = ({ data, pageContext }) => {
    return (

        <Layout>

            <HeroSection title="Md Blog"/>
            
            <div className="container">
            <>
                {data.allMarkdownRemark.nodes.map(node => (
                    <div key={node.id}>
                        <Link to={`/mdposts${node.fields.slug}`}>
                            {node.frontmatter.title || `No title`}
                        </Link>
                        &nbsp;- {node.frontmatter.date || `No-date`}
                        <p>
                            {node.excerpt}
                        </p>
                    </div>
                ))}
            </>

            <Pagination pages={pageContext.mdPages} currentPage={pageContext.currentPage} />
                
            </div>
        </Layout>

    )
}

export default Mdpost

export const mdQuery = graphql`
query postsMdQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(skip: $skip, limit: $limit, sort: {order: DESC, fields: frontmatter___date} ) {
        nodes {
            id
            excerpt(format: PLAIN, pruneLength: 80, truncate: true)
            fields {
                slug
            }
            frontmatter {
                title
                date
            }
        }
    }
}`