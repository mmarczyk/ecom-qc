const Content = () => {
    let content = <Homepage />;
    if (window.location.search !== '') {
        content = null;
        if (window.location.search.match(/^\?\d+,.*$/)) {
            content = <Product />;
        } else if (oPageData.iProducts) {
            content = <Category />;
        } else if (oPageData.aCart) {
            content = <Cart />;
        } else if (oPageData.aOrder) {
            content = <Order />;
        } else {
            content = <CmsPage />;
        }
    }

    return (
        <div className="Content container">
            {content}
        </div>
    );
};