const Popular = () => {
    const products = oProducts.map(element => {
        return (
            <li>
                <h2>
                    <a href={element.sLinkName}>{element.sName}</a>
                </h2>
                <div class="photo">
                    <a href={element.sLinkName}>
                        <img src={element.sImage.sFileName} alt={element.sName}/>
                    </a>
                </div>
                <div class="price">
                    <em>Cena: </em>
                    <strong>{element.mPrice}</strong>
                    <span>zł</span>
                </div>
            </li>
        );
    });
    return (
        <div className="Popular">
            <span>Popularne</span>
            <div>
                <ul>
                    {products}
                </ul>
            </div>
        </div>
    );
};