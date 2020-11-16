const ProductItem = ({data, index, readonly}) => {
    if(data in oPageData && (typeof oPageData[data] === 'object')) {
        if(index in oPageData[data].aProducts) {
            const product = oPageData[data].aProducts[index];
            const submit = readonly ? null : 
                <Submit
                    className="Remove"
                    href={product.sLinkDelete}
                    action={(event) =>
                            removeFromCart(event.currentTarget)}>
                    <i className="icofont-trash" />
                </Submit>;

            return (
                <div className="ProductItem">
                <div>
                    <Link href={product.sLinkName}>
                        <img src={product.sImage} alt={product.sName} />
                    </Link>
                </div>
                <div>
                    <div>
                        <span>{product.sName}</span>
                    </div>
                    <div>
                        <span>{product.fPrice} zł</span>
                        <Amount product={product} readonly={readonly}/>
                        <span>{product.fSummary} zł</span>
                        {submit}
                    </div>
                </div>
                </div>
            );
        }
    }
};