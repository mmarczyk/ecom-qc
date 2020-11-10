const ProductItem = props => {
    if(oPageData.aCart && (typeof oPageData.aCart === 'object')) {
        if(props.index in oPageData.aCart.aProducts) {
            const product = oPageData.aCart.aProducts[props.index];
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
                        <Amount product={product}/>
                        <span>{product.fSummary} zł</span>
                        <Submit
                            className="Remove"
                            href={product.sLinkDelete}
                            action={(event) =>
                                removeFromCart(event.currentTarget)}>
                            <i className="icofont-trash" />
                        </Submit>
                    </div>
                </div>
                </div>
            );
        }
    }
};