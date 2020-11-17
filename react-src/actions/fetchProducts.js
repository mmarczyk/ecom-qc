const fetchProducts = (text, search) => {
    /*const href = text.length > 3 ?
        search + '&sPhrase=' + encodeURIComponent(text) :
        search;*/
    const href = search + '&sPhrase=' + encodeURIComponent(text);
    genericFetch(
        {
            href: href,
            search: href
        },
        (data, href) => {
            history.pushState({href: href}, '', href);
            oPageData = data;
            Animation.start();
            renderApp();
        }
    );
}