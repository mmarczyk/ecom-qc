const CartItemList = ({data, readonly}) => {
    if(data in oPageData && (typeof oPageData[data] === 'object')) {
        const products = oPageData[data].aProducts.map( (element, idx) => {
            return (
                <li key={idx}>
                    <ProductItem index={idx} data={data} readonly={readonly}/>
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