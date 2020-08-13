import React from "react"
import ReactSlider from "react-slick";


const Slider = ({ flexdata }) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    
    return (
        <>
            <div className="container">
                <div className={`${flexdata.class}-content`} dangerouslySetInnerHTML={{ __html: flexdata.data.content }}></div>

                <div className={`${flexdata.class}-gallery-wrap`}>
                    <div className={`${flexdata.class}-gallery`}>
                        <ReactSlider {...settings}>
                            {flexdata.data.gallery.map((item, index) => (
                                <div key={index}>
                                    <div style={{
                                        padding: `15px`
                                    }}>
                                        <div style={{
                                            backgroundImage: `url(/${item.sourceUrl.split('/wp-content/')[1]})`,
                                            backgroundSize: `cover`,
                                            backgroundPosition: `center center`,
                                            minHeight: 500,
                                        }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </ReactSlider>
                    </div>
                </div>
            </div>
        </>
    )
}

Slider.defaultProps = {
    flexdata: {},
}

export default Slider