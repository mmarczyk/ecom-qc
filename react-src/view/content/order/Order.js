const Order = () => {
    useEffect(() => window.scrollTo(0, 0));

    if(oPageData.aOrder){
        oPageData.aOrder.oOrder = {
            shipping: {
               price: oPageData.aOrder.fPaymentShippingPrice
            }
        };

        return (
            <div className="Order">
                <OrderSummary />
                <CartItemList data="aOrder" readonly/>
                <Summary data='aOrder' order/>
            </div>
        );
    }
};