const Gallery = () => {
    if (oPageData && oPageData.aImages && oPageData.aImages.left) {
        const images = oPageData.aImages.left.map((element, index) => {
            return (
                <li key={index}>
                    <div className="nav">
                        <img src={element.sSizedImageLink} alt={element.sAlt} />
                    </div>
                    <div className="main">
                        <img src={element.sSizedImageLink} alt={element.sAlt} />
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

    return (
        <div className="Gallery"/>
    );
};