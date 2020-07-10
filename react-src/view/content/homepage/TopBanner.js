const TopBanner = () => {
    let imagesLeft = null;
    let imagesRight = null;

    const convert = element => {
        return (
            <li>
                <a href={element.sFullImageLink}>
                    <img src={element.sSizedImageLink}/>
                </a>
            </li>
        );
    };

    imagesLeft = sImages.left.map(convert);
    imagesRight = sImages.right.map(convert);

    return (
        <div className="TopBanner">
            <div>
                <ul class="imagesList" id="imagesList1">
                    {imagesLeft}
                </ul>
                <ul class="imagesList" id="imagesList2">
                    {imagesRight}
                </ul>
            </div>
        </div>
    );
};