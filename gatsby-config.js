const dotevn = require('dotenv');

// When running build and serve comment out conditon and leave dotenv.config
// if (process.env.NODE_ENV !== 'production') {
dotevn.config();
// }

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              withWebp: true,
              maxWidth: 1920,
              linkImagesToOriginal: true,
            }
          },
          `gatsby-remark-responsive-iframe`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        url: `http://localhost/gatsby-react/gatsby-wp/graphql`,
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://eee.us19.list-manage.com/subscribe/post?u=681511b66b2261618f9f549fd&amp;id=9f6de121c5', // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },

    // {
    //   resolve: 'gatsby-plugin-copy-files-enhanced',
    //   options: {
    //     source: `${__dirname}/gatsby-wp/wp-content/uploads/2020/07/`,
    //     destination: '/uploads/*/',
    //     purge: true,
    //   }
    // }
    // {
    //   resolve: `gatsby-plugin-snipcart`,
    //   options: {
    //     apiKey: process.env.SNIPCART_TEST_KEY,
    //     autopop: true,
    //   }
    // }

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
