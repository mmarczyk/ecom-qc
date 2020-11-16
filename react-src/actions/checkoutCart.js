const checkoutCart = (target) => {
    event.preventDefault();

    const sFirstName = oPageData.aCart.oOrder.name.split(' ', 1);
    const sLastName = oPageData.aCart.oOrder.name.split(' ').slice(1);
    
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
                sFirstName: sFirstName,
                sLastName: sLastName,
                sCompanyName: oPageData.aCart.oOrder.name,
                sStreet: oPageData.aCart.oOrder.street,
                sZipCode: oPageData.aCart.oOrder.zip,
                sCity: oPageData.aCart.oOrder.city,
                sPhone: oPageData.aCart.oOrder.phone,
                sEmail: oPageData.aCart.oOrder.email,
                sComment: oPageData.aCart.oOrder.comment,
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