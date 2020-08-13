import React from "react";
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components";

import Youtube from "assets/svgs/youtube.svg";
import Pinterest from "assets/svgs/pinterest.svg";
import Twitter from "assets/svgs/twitter.svg";
import Instagram from "assets/svgs/instagram.svg";


const StyledBtn = styled.a`
background: ${props => props.theme.color};
svg {
    fill: ${props => props.theme.background}
}
`;

const SocialNetworks = ({props}) => {
    return (
        <div className={`social-wrap`}>
            <StaticQuery
                query={graphql`
                {
                    wpgraphql {
                    themeGeneralSettings {
                        themesettings {
                        fieldGroupName
                        socialNetworks {
                            fieldGroupName
                            network
                            url
                        }
                        }
                    }
                    }
                }
                                        `}
                render={data => {
                    const networkComponents = {
                        Youtube: Youtube,
                        Pinterest: Pinterest,
                        Twitter: Twitter,
                        Instagram: Instagram,
                    }
                    let networkItems = [];

                    data.wpgraphql.themeGeneralSettings.themesettings.socialNetworks.forEach((Element) => (
                        networkItems.push({
                            component: networkComponents[Element.network],
                            data: Element
                        })
                    ))

                    return (
                        networkItems.map((NetworkItem, i) => (
                            <div key={i}>
                                <StyledBtn href={NetworkItem.data.url} target="_blank" rel="noreferrer">
                                    <NetworkItem.component width="1.2em"  />
                                </StyledBtn>
                            </div>
                        ))
                    )
                }}
            ></StaticQuery>
        </div>
    )
}

export default SocialNetworks