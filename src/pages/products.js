import React from "react";
import { useStaticQuery, Link } from "gatsby";

import Layout from "components/layout";

const ProductsPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allProducts:allContentfulProduct {
                products:nodes {
                    id
                    slug
                    name
                    price
                }
            }
        }
    `)

    return (
        <>
        <Layout>
            <div className="container">
                <h1>
                    Products
                </h1>
                {data.allProducts.products.map((product) => {
                    return (
                    <h2 key={product.id}>
                        <Link to={product.slug}>
                            {product.name}
                        </Link>&nbsp;-&nbsp;
                        ${product.price}
                    </h2>
                )})}
            </div>
        </Layout>
        </>
    )
}
export default ProductsPage