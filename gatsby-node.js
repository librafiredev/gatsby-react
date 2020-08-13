/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")
const CopyPlugin = require('copy-webpack-plugin')

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

// Absolute paths for import
exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'gatsby-wp/wp-content/uploads', to: 'uploads' },
                ],
            }),
        ],
    })
}

// Generate pages from wordpress pages
exports.createPages = async function ({ actions, graphql }) {
    const result = await graphql(`
    query {
        wpgraphql {
            pages(where: {orderby: {field: DATE, order: ASC}}) {
                edges {
                    node {
                        id
                        slug
                        databaseId
                        isFrontPage
                    }
                }
            }
        }
        allMarkdownRemark {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                }
            }
        }
        allContentfulProduct {
            nodes {
                id
                slug
            }
        }
    }`).then(result => {

        let useBackupHomepage = true;

        result.data.wpgraphql.pages.edges.forEach(edge => {
            const slug = edge.node.slug;
            const dbid = edge.node.databaseId;

            actions.createPage({
                path: edge.node.isFrontPage ? '/' : `${slug}/`,
                component: require.resolve('./src/templates/page.js'),
                context: { dbid },
            })

            if (edge.node.isFrontPage) {
                useBackupHomepage = false;
            }
        })

        if (useBackupHomepage) {
            actions.createPage({
                path: '/',
                component: require.resolve('./src/templates/index-fallback.js'),
            })
        }


        // Markdown pages creation
        const mdRoot = '/mdposts';
        let mdPages = [];

        result.data.allMarkdownRemark.nodes.forEach((node, index, postArr) => {
            // Generate MD single pages
            actions.createPage({
                path: `${mdRoot}${node.fields.slug}`,
                component: require.resolve('./src/templates/mdposts-single-template.js'),
                context: { id: node.id }
            })

            // Generate MD archive pages
            const postsPerPage = 2;
            const totalPages = postArr.length;
            const isFirstPage = index < postsPerPage;
            const isLastPage = index >= totalPages - postsPerPage;

            if (index % postsPerPage === 0) {
                mdPages.push({
                    skip: index,
                    limit: postsPerPage,
                    isFirstPage,
                    isLastPage,
                    paginationPath: index === 0 ? `${mdRoot}` : `${mdRoot}/${String(index / postsPerPage + 1)}`
                })
            }

        });

        mdPages.forEach(({ skip, limit, isFirstPage, isLastPage }, cp) => {
            const currentPage = cp + 1;
            const path = skip === 0 ? `${mdRoot}` : `${mdRoot}/${String(currentPage)}`;
            actions.createPage({
                path: path,
                component: require.resolve('./src/templates/mdposts-template.js'),
                context: {
                    skip, limit, isFirstPage, isLastPage, currentPage, mdPages,
                }
            })
        });

        result.data.allContentfulProduct.nodes.forEach(({ id, slug }) => {
            actions.createPage({
                path: `/products/${slug}`,
                component: require.resolve('./src/templates/contentful-single-product.js'),
                context: {
                    id
                }
            })
        });
    });
}