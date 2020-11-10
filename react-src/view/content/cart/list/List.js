const List = () => {
    if(oPageData.aCart && (typeof oPageData.aCart === 'object')) {
        const products = oPageData.aCart.aProducts.map( (element, idx) => {
            return (
                <li>
                    <ProductItem index={idx}/>
                </li>
            );
        });
        return (
            <div className="List">
                <div>
                    <ul>
                        {products}
                    </ul>
                </div>
            </div>
        );
    }
};