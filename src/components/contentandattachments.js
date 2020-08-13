import React from "react"

const ContentAndAttachments = ({ flexdata }) => {
    flexdata.data.attachments = flexdata.data.attachments.filter((a) => {
        return a.thumbnail;
    });
    return (
        <>
            <div className="container-narrow">
                <div className={`${flexdata.class}-content`} dangerouslySetInnerHTML={{ __html: flexdata.data.content }}></div>
                <div className={`${flexdata.class}-attachments`}>
                    {flexdata.data.attachments.map((item, index) => (
                        <div key={index} style={{
                            maxWidth: `33.33333%`,
                            flex: `0 0 33.33333%`,
                            padding: `15px`
                        }}>
                            {item.file ?
                                <a href={`/${item.file.mediaItemUrl.split('/wp-content/')[1]}`} download="download" target="_blank" rel="noreferrer" className={`${flexdata.class}-item`}>
                                    <div style={{
                                    backgroundImage: `url(/${item.thumbnail.sourceUrl.split('/wp-content/')[1]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center center`,
                                    minHeight: 200,
                                }}></div>
                                </a>
                                :
                                <div style={{
                                    backgroundImage: `url(/${item.thumbnail.sourceUrl.split('/wp-content/')[1]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center center`,
                                    minHeight: 200,
                                }}></div>
                            }

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

ContentAndAttachments.defaultProps = {
    flexdata: {},
}

export default ContentAndAttachments