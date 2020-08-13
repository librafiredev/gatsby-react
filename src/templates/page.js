import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Layout from "components/layout"

import styled from "styled-components";

// Import flexible content "react components"
import Slider from "components/slider"
import ContentAndAttachments from "components/contentandattachments"
import TabbedGallery from "components/tabbedgallery"
import MultiCol from "components/multicol"
import AddDriver from "components/adddriver"

import addToMailchimp from 'gatsby-plugin-mailchimp'

const NewsletterSection = styled.div`
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    padding 30px;
    background: ${props => props.theme.color};
    color: ${props => props.theme.background};
    position: relative;
    margin-bottom: 0;

    &:before {
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
        background: white;
        opacity: .2;
    }

    * {
        position: relative;
    }

    h2{ 
        text-transform: uppercase;
    }

    input {
        text-align: center;
        width: 94%;
        max-width: 500px;
        margin-bottom: 15px;
        margin-top: 15px;
    }

    button {
        apperance: none;
        border: none;
        display: block;
        background: ${props => props.theme.background};
        color: ${props => props.theme.color};
        padding: 10px 30px;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: none;
        transition: 400ms;
        &:hover {
            background: #008cff;
        }
    }

    .validation-msg {
        margin: 10px 0 0;
        color: white;
        padding: 2px 10px;
        font-size: 14px;

        a {
            color: white;
        }

        &.error {
            background: crimson;
        }

        &.success {
            background: #3fb782;
        }
    }
}
`

export default class IndexPage extends React.Component {
    constructor() {
        super()
        this.state = {
            EMAIL: "",
            emailMsg: "",
            emailClass: "",
        }
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
        })
    }

    updateFields = () => {

    }

    handleSubmit = event => {
        event.preventDefault();
        addToMailchimp(this.state.EMAIL)
            .then(data => {
                // I recommend setting data to React state
                // but you can do whatever you want (including ignoring this `then()` altogether)
                console.log(data);
                this.setState({
                    emailMsg: data.msg,
                    emailClass: data.result,
                })

            })
            .catch(() => {
                // unnecessary because Mailchimp only ever
                // returns a 200 status code
                // see below for how to handle errors
                console.log('error');
            })
    }

    render() {
        let data = this.props.data;

        let pageComponents = [];
        // Assign components to the "map" so it is possible to loop the components
        // Component index should be the same as the co
        let FlexibleComponents = {
            "Slider": Slider,
            "ContentAndAttachments": ContentAndAttachments,
            "TabbedGallery": TabbedGallery,
            "MultiCol": MultiCol,
            "AddDriver": AddDriver,
        };

        data.wpgraphql.page.flexibleG.flexible.forEach(node => {
            // Split to eliminate post type (in this case page) and flexible group from the field name
            let type = node.fieldGroupName.split('Flexibleg_Flexible_')[1];
            if (FlexibleComponents[type]) {
                pageComponents.push({
                    type: FlexibleComponents[type],
                    data: node,
                    class: `lf-${type.toLowerCase().replace(' ', '-')}`,
                });
            }
        });


        return (
            <React.Fragment>
                <SEO title={data.wpgraphql.page.title} />
                <Layout>
                    <div className="container">
                        <div dangerouslySetInnerHTML={{ __html: data.wpgraphql.page.content }}></div>
                    </div>

                    {pageComponents.map((Component, index) => (
                        <div key={index} className={Component.class}>
                            <Component.type flexdata={Component} />
                        </div>
                    ))}

                    <NewsletterSection>

                        <form onSubmit={this.handleSubmit}>
                            <h2>
                                Sign Up for newsletter
                            </h2>
                            <input
                                type="email"
                                name="EMAIL"
                                className="required email"
                                onChange={this.handleInputChange}
                            />
                            <button>Sign up</button>
                            {
                                this.state.emailMsg ?
                                    <div className={`validation-msg ${this.state.emailClass}`} dangerouslySetInnerHTML={{ __html: this.state.emailMsg }}></div>
                                    :
                                    ``
                            }
                        </form>
                    </NewsletterSection>
                </Layout>
            </React.Fragment>
        )
    }
}


// Get actual data from the wordpress, every new flexible component needs to be queried
export const pageQuery = graphql`
query SinglePageQuery($dbid: ID!) {
    wpgraphql {
        page(id: $dbid, idType: DATABASE_ID) {
            id
            title
            content
            flexibleG {
                flexible {
                    ... on WPGraphQL_Page_Flexibleg_Flexible_Slider {
                        content
                        fieldGroupName
                        gallery {
                            sourceUrl(size: LARGE)
                        }
                    }
                    ... on WPGraphQL_Page_Flexibleg_Flexible_ContentAndAttachments {
                        content
                        fieldGroupName
                        attachments {
                            thumbnail {
                                sourceUrl(size: LARGE)
                            }
                            file {
                                mediaItemUrl
                            }
                        }
                    }
                    ... on WPGraphQL_Page_Flexibleg_Flexible_TabbedGallery {
                        content
                        fieldGroupName
                        tabs {
                            tabLabel
                            gallery {
                                text
                                image {
                                    sourceUrl(size: LARGE)
                                }
                            }
                        }
                    }
                    ... on WPGraphQL_Page_Flexibleg_Flexible_MultiCol {
                        colOneText
                        colTwoEmbed
                        colTwoLink {
                            ... on WPGraphQL_Page {
                                slug
                            }
                            ... on WPGraphQL_Post {
                                slug
                            }
                        }
                        colOneImage {
                            sourceUrl(size: LARGE)
                        }
                        colTwoText
                        content
                        fieldGroupName
                    }
                    ... on WPGraphQL_Page_Flexibleg_Flexible_AddDriver {
                        content
                        fieldGroupName
                        driver {
                            details
                            link {
                                ... on WPGraphQL_Page {
                                    slug
                                }
                            }
                            image {
                                sourceUrl(size: LARGE)
                            }
                            name
                            text
                        }
                    }
                }
            }
        }
    }
}
`