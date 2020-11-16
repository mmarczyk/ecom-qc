const Amount = ({product, readonly}) => {
    const buttonQuantityAdd = readonly ? null :
            <Submit
                href={sCartPage}
                action={(event) => removeFromCartSingle(
                    event.currentTarget, 
                    product.iProduct,
                    product.iQuantity
                )}
                disabled={product.iQuantity === 1}>
                <i className="icofont-rounded-down" />
            </Submit>;
    const buttonQuantityReduce = readonly ? null :
            <Submit
                href={sCartPage}
                action={(event) => addToCart(
                    event.currentTarget, 
                    product.iProduct
                )}>
                <i className="icofont-rounded-up" />
            </Submit>;

    return (
        <div className="Amount">
            {buttonQuantityAdd}
            <span>{product.iQuantity}</span>
            {buttonQuantityReduce}
        </div>
    );
};