const TopBanner = () => {
    const convert = element => {
        return (
            <li>
                <img src={element.sSizedImageLink} />
            </li>
        );
    };

    let imagesLeft = null;
    if (oPageData && oPageData.aImages && oPageData.aImages.left) {
        imagesLeft = (
            <ul className="imagesList" id="imagesList1">
                {oPageData.aImages.left.map(convert)}
            </ul>
        );
    }

    let imagesRight = null;
    if (oPageData && oPageData.aImages && oPageData.aImages.right) {
        imagesRight = (
            <ul className="imagesList" id="imagesList2">
                {oPageData.aImages.right.map(convert)}
            </ul>
        );
    }

    return (
        <div className="TopBanner">
            <div>
                {imagesLeft}
                {imagesRight}
            </div>
        </div>
    );
};