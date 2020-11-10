const addToCart = (target, productId) => {
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
            body: 'iProductAdd='+productId+'&iQuantity=1'
        }
    );
    
    return false;
};