import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const HeroStyled = styled.div`
    position: relative;
    overflow: hidden;
    padding: 30px;
    text-align: center;
    margin-bottom: 50px;

    h1 {
        position: relative;
        margin-bottom: 0;
        background-color: rgba(0,0,0,0.6);
        display: inline-block;
        padding: 10px 20px;
        color: white;
    }
`

const HeroBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`

const HeroSection = ({ title, image }) => {
    const data = useStaticQuery(graphql`
    query {
      imageLarge: file(relativePath: { eq: "large-image.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)
    return (
        <HeroStyled>
            <HeroBackground>
                <Img fluid={data.imageLarge.childImageSharp.fluid} />
            </HeroBackground>
            <h1>
                {title}
            </h1>
        </HeroStyled>
    )
}

export default HeroSection