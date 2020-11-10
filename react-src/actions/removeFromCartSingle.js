const removeFromCartSingle = (target, productId, quantity) => {
    event.preventDefault();
    
    quantity -= 1;

    if(quantity > 0) { 
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
                body: 'aProducts['+productId+']='+quantity
            }
        );
    }
    
    return false;
};