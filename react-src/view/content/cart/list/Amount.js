const Amount = props => {
    return (
        <div className="Amount">
            <Submit
                href={sCartPage}
                action={(event) => removeFromCartSingle(
                    event.currentTarget, 
                    props.product.iProduct,
                    props.product.iQuantity
                )}
                disabled={props.product.iQuantity === 1}>
                <i className="icofont-rounded-down" />
            </Submit>
            <span>{props.product.iQuantity}</span>
            <Submit
                href={sCartPage}
                action={(event) => addToCart(
                    event.currentTarget, 
                    props.product.iProduct
                )}>
                <i className="icofont-rounded-up" />
            </Submit>
        </div>
    );
};