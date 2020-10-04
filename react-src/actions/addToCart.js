const addToCart = (target, productId) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            history.pushState({href: href}, '', href);
            oPageData = data;
            Animation.start();
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