const Gallery = () => {
    if (oPageData && oPageData.aImages) {
        const images = oPageData.aImages.left.map(element => {
            return (
                <li>
                    <div className="nav">
                        <img src={element.sSizedImageLink} alt={element.sAlt} />
                    </div>
                    <div className="main">
                        <img src={element.sFullImageLink} alt={element.sAlt} />
                    </div>
                </li>
            );
        });

        return (
            <div className="Gallery">
                <ul>
                    {images}
                </ul>
            </div>
        );
    }
};