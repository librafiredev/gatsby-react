import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import SocialNetworks from "components/social-networks";

const DriverComp = styled.div`
    padding: 50px 0;
`

const DriverActions = styled.div`
display: flex;
flex-wrap: wrap;
padding: 30px 0;
flex: 0 0 100%;
max-width: 100%;

a {
    display: block;
    margin-right: auto;
    background: ${props => props.theme.color};
    color: ${props => props.theme.background};
    padding: 10px 30px;
    width: 50%;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    transition: 400ms;
    &:hover {
        background: #008cff;
    }
}
`

const DriverGrid = styled.div`
display: flex;
flex-wrap: wrap;
`

const DriverWrap = styled.div`
display: flex;
flex-wrap: wrap;
flex: 0 0 50%;
max-width: 50%;
align-items: center;
padding: 15px;

.quick-text {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 30px;
}
`

const DriverImg = styled.div`
flex: 0 0 50%;
max-width: 50%;

img {
    border-radius: 50%;
    margin-botton: 0
}
`

const AddDriver = ({ flexdata }) => {

    return (
        <DriverComp>
            <div className={`container`}>
                <div dangerouslySetInnerHTML={{ __html: flexdata.data.content }}></div>
    
                <DriverGrid>
                    {flexdata.data.driver.map((driver, i) => {
    
                        return (
                            <DriverWrap key={i}>
                                {driver.image.sourceUrl ?
                                    <DriverImg>
                                        <img alt="" src={`/${driver.image.sourceUrl.split('/wp-content/')[1]}`} />
                                    </DriverImg>
                                    :
                                    ``
                                }
                                <div className="quick-text">
                                    <h3>
                                        {driver.name}
                                    </h3>
                                    {driver.text}
                                </div>
                                <div>
                                    {driver.details}
                                </div>
                                <DriverActions>
                                    <Link to={`/${driver.link.slug}`} >
                                        Find out more
                                    </Link>
                                </DriverActions>
                                <SocialNetworks />
                            </DriverWrap>
                        )
                    })}
                </DriverGrid>
            </div>
        </DriverComp>
    )
}

export default AddDriver