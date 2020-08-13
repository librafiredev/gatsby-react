import React from "react"
import Layout from "components/layout"
import Img from "gatsby-image";
import styled from "styled-components/macro";

import { ProductMain } from "components/front/product-main"

const Cimage = styled.div`
    padding: 40px 0;
    flex: 0 0 50%;
    max-width: 50%;
`;

const ImageGallery = styled.div`
    display: flex;
    flex-wrap-wrap
`;



const ProductSingle = ({ data: { contentfulProduct }, location }) => {

    return (
        <>
            <Layout>
                <ProductMain>
                    <div className="container">
                        <h1>
                            {contentfulProduct.name}
                        </h1>
                        <h2>
                            ${contentfulProduct.price}
                        </h2>
                        {/* <button 
                        className="snipcart-add-item"
                        data-item-id={contentfulProduct.id}
                        data-item-price={contentfulProduct.price}
                        data-item-image={contentfulProduct.image[0].file.url}
                        data-item-name={contentfulProduct.name}
                        data-item-url={location.pathname}
                        >Add to cart</button> */}

                        <div>
                            Some placeholder text because ritch text field from contentful require libraries/pugins to render...
                        </div>

                        <ImageGallery>
                            {contentfulProduct.image.map(({ fluid }, index) => (
                                <Cimage key={index}>
                                    <Img fluid={fluid} />
                                </Cimage>
                            ))}
                        </ImageGallery>
                    </div>
                </ProductMain>
            </Layout>
        </>
    )
}

export default ProductSingle

export const ProductSingleQuery = graphql`
query ProductSingleQuery($id: String!) {
    contentfulProduct(id: {eq: $id}) {
        id
        name
        price
        updatedAt(fromNow: true)
        # sometext {
        #     json
        # }
        image {
            fluid {
                ...GatsbyContentfulFluid
            }
            file {
                url
            }
        }
    }
}`