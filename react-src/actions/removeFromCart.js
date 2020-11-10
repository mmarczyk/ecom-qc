const removeFromCart = (target) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
            renderApp();
        }
    );
    
    return false;
};