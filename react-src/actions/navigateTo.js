const navigateTo = (event) => {
    event.preventDefault();

    genericFetch(
        event.currentTarget,
        (data, href) => {
            history.pushState({href: href}, '', href);
            oPageData = data;
            Animation.start();
            renderApp();
        }
    );

    return false;
}