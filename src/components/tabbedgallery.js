import React from "react"
import SocialNetworks from "components/social-networks";

export default class TabbedGallery extends React.Component {
    constructor(props) {
        super();
        this.state = {
            currentTab: 0,
            currentImage: 0,
            imageData: props.flexdata.data.tabs[0].gallery[0]
        }
    }

    changeCurrentTab(i) {
        this.setState({
            currentTab: i,
        }, () => {
            this.changeCurrentImage(0)
        });
    }

    changeCurrentImage(i) {
        let tab = this.state.currentTab;
        this.setState({
            currentImage: i,
            imageData: this.props.flexdata.data.tabs[tab].gallery[i]
        });
    }

    render() {

        return (
            <>
                <div className="container">
                    <div className={`${this.props.flexdata.class}-content`} dangerouslySetInnerHTML={{ __html: this.props.flexdata.data.content }}></div>

                    <div className={`${this.props.flexdata.class}-main`}>
                        <div className={`${this.props.flexdata.class}-img-wrap`}>
                            <img src={`/${this.state.imageData.image.sourceUrl.split('/wp-content/')[1]}`} alt="" onError={(e) => {
                                e.target.onerror=null;
                                e.target.src='/placeholder.png';
                            }} />
                            <div>
                                {this.state.imageData.text}
                                <SocialNetworks/>
                            </div>
                        </div>
                        <div className={`${this.props.flexdata.class}-tabs`}>
                            {this.props.flexdata.data.tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        this.changeCurrentTab(index);
                                    }}
                                    className={`${this.props.flexdata.class}-nav-btn ${this.state.currentTab === index ? 'active' : ''}`}
                                >
                                    {tab.tabLabel}
                                </button>
                            ))}
                            <div className={`${this.props.flexdata.class}-gallery`}>
                                {this.props.flexdata.data.tabs.map((tab, index) => (
                                    <div
                                        key={index}
                                        className={`${this.props.flexdata.class}-tab ${this.state.currentTab === index ? 'active' : ''}`}
                                    >
                                        {tab.gallery.map((img, jdex) => (
                                            <div
                                                key={jdex}
                                                className={`${this.props.flexdata.class}-btn-wrap ${this.state.currentImage === jdex ? 'active' : ''}`}
                                            >
                                                <button
                                                    style={{
                                                        backgroundImage: `url(/${img.image.sourceUrl.split('/wp-content/')[1]})`
                                                    }}
                                                    className={`${this.props.flexdata.class}-btn`}
                                                    onClick={() => {
                                                        this.changeCurrentImage(jdex);
                                                    }}
                                                >
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
