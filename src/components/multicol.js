import React from "react"
import styled from "styled-components"

import { Link } from "gatsby";

const MultiColWrap = styled.div`
display: flex;
flex-wrap: wrap;
`
const MultiColItem = styled.div`
max-width: 50%;
padding: 15px;
`

const MultiIframe = styled.iframe`
width: 100%;
min-height: 400px;
border: none;
`

const MultiLink = styled.div`
padding: 30px 0;
a {
    text-decoration: none;
    padding: 10px 25px;
    text-transform: uppercase;
    font-weight: bold;
    background-color: ${props => props.theme.color};
    color: ${props => props.theme.background};
    transition: 400ms;

    &:hover {
        background-color: #008cff;
        color: #fff;
    }
}
`

export const MultiCol = ({ flexdata }) => {
    return (
        <div className={`container`}>
            <div dangerouslySetInnerHTML={{ __html: flexdata.data.content }}></div>
            <MultiColWrap>
                <MultiColItem>
                    <img alt="" src={`/${flexdata.data.colOneImage.sourceUrl.split('/wp-content/')[1]}`} />
                    <div dangerouslySetInnerHTML={{ __html: flexdata.data.colOneText }}></div>
                </MultiColItem>
                <MultiColItem>
                    {flexdata.data.colTwoEmbed ?
                        <MultiIframe src={`https://www.youtube.com/embed/${flexdata.data.colTwoEmbed.split('watch?v=')[1]}`}></MultiIframe>
                        :
                        ``
                    }

                    <div dangerouslySetInnerHTML={{ __html: flexdata.data.colTwoText }}></div>
                    <MultiLink>
                        <Link to={flexdata.data.colTwoLink.slug}>
                            Read more
                        </Link>
                    </MultiLink>
                </MultiColItem>
            </MultiColWrap>
        </div>
    )
}

export default MultiCol