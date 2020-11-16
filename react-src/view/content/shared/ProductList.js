const ProductList = (config) => {
    if (oPageData && oPageData.aProducts) {
        const products = oPageData.aProducts.map((element, index) => {
            const img = element.sImage ? element.sImage.sFileName : sDirImg + 'no-image.png';
            const name = element.sName.length > 27 ? element.sName.substring(0, 25) + '...' : element.sName;
            
            const nameBlock =
                config.notitle ?
                null :                     
                <div className="name">
                    <h3>
                        <Link href={element.sLinkName}>{name}</Link>
                    </h3>
                </div>;

            return (
                <li key={index}>
                    <div className="photo">
                        <Link href={element.sLinkName}>
                            <img src={img} alt={element.sName} />
                        </Link>
                    </div>
                    {nameBlock}
                    <div className="price">
                        <strong>{element.mPrice}</strong>
                        <span>zł</span>
                    </div>
                </li>
            );
        });
    
    return (
        <div className="ProductList">
            <ul>
                {products}
            </ul>
        </div>
    );
    }
};