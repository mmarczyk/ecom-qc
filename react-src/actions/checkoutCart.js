const checkoutCart = (target) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
            renderApp();
        },
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: jsonToForm({
                sFirstName: oPageData.aCart.oOrder.name,
                sLastName: oPageData.aCart.oOrder.name,
                sCompanyName: oPageData.aCart.oOrder.name,
                sStreet: oPageData.aCart.oOrder.street,
                sZipCode: oPageData.aCart.oOrder.zip,
                sCity: oPageData.aCart.oOrder.city,
                sPhone: '654345653',
                sEmail: 'my@email.com',
                sComment: '',
                sShippingPayment: [
                    oPageData.aCart.oOrder.shipping.id,
                    oPageData.aCart.oOrder.payment,
                    oPageData.aCart.oOrder.shipping.price
                ].join(';'),
                iRules: 1,
                iRulesAccept: 1,
                sOrderSend: true
            })
        }
    );

    return false;
};