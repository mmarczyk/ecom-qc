const Summary = ({data, order}) => {
    const [amount, cost, total] = [
        oPageData[data].fTotalAmount,
        oPageData[data].oOrder.shipping.price,
        changePriceFormat(parseFloat(oPageData[data].fTotalAmount)
            + parseFloat(oPageData[data].oOrder.shipping.price))
    ];
    let submit = null;
    if(!order) {
        const isOrderReady = () =>
            oPageData.aCart.bAcceptRules == true &&
            oPageData.aCart.bAcceptGdpr == true &&
            oPageData.aCart.oOrder.shipping.id > 0 &&
            oPageData.aCart.oOrder.payment > 0 &&
            oPageData.aCart.oOrder.name.length > 0 &&
            oPageData.aCart.oOrder.street.length > 0 &&
            oPageData.aCart.oOrder.zip.length == 6 &&
            oPageData.aCart.oOrder.city.length > 0;

        submit = 
            <div>
                <Submit
                    href={sOrderPage}
                    action={(event) => checkoutCart(
                    event.currentTarget
                    )}
                    disabled={
                        !isOrderReady()}
                >
                    Zamów
                </Submit>
            </div>;
    } else {
        submit = 
            <div>
                <a href="http://wp.pl" target="_blank">
                    Zapłać
                </a>
            </div>;
    }

    const shipping = oPageData[data].mShipping ? "(" + oPageData[data].mShipping + ")" : null;
    
    return (
        <div className="Summary">
            <h1>Podsumowanie</h1>
            <div>
                <div>
                    <span>Koszt zakupów</span>
                    <span>{amount} zł</span>
                </div>
                <div>
                    <span>Koszt dostawy {shipping}</span>
                    <span>{cost} zł</span>
                </div>
                <div>
                    <span>Do zapłaty</span>
                    <span>{total} zł</span>
                </div>
                {submit}
            </div>
        </div>
    );
};