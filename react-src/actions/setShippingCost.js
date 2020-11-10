const setShippingCost = (element) => {
    oPageData.aCart.oOrder.shipping = {
        price: element.fPrice,
        id: element.iIdShipping
    };
    renderApp();
};