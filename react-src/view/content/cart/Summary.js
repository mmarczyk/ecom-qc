const Summary = () => {
    const [amount, shipping, total] = [
        oPageData.aCart.fTotalAmount,
        oPageData.aCart.oOrder.shipping.price,
        changePriceFormat(parseFloat(oPageData.aCart.fTotalAmount)
            + parseFloat(oPageData.aCart.oOrder.shipping.price))
    ];
    const isOrderReady = () =>
        oPageData.aCart.bAcceptRules == true &&
        oPageData.aCart.bAcceptGdpr == true &&
        oPageData.aCart.oOrder.shipping.id > 0 &&
        oPageData.aCart.oOrder.payment > 0 &&
        oPageData.aCart.oOrder.name.length > 0 &&
        oPageData.aCart.oOrder.street.length > 0 &&
        oPageData.aCart.oOrder.zip.length == 6 &&
        oPageData.aCart.oOrder.city.length > 0;
    
    return (
        <div className="Summary">
            <h1>Podsumowanie</h1>
            <div>
                <div>
                    <span>Koszt zakupów</span>
                    <span>{amount} zł</span>
                </div>
                <div>
                    <span>Koszt dostawy</span>
                    <span>{shipping} zł</span>
                </div>
                <div>
                    <span>Do zapłaty</span>
                    <span>{total} zł</span>
                </div>
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
                </div>
            </div>
        </div>
    );
};