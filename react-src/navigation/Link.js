const Link = ({href, children}) => {
    const appendHref = (target) => {
        return [
            target.href,
            target.origin + "/json/" + target.pathname + target.search
        ];
    }
    const navigateTo = (event) => {
        event.preventDefault();

        const [orgHref, href] = appendHref(event.currentTarget);

        fetch(href)
            .then(response => response.json())
            .then((data) => {
                history.pushState({href: orgHref}, '', orgHref);
                oPageData = data;
                Animation.start();
                renderApp();
            });

        return false;
    }

    return (
        <a href={href} onClick={navigateTo}>{children}</a>
    );
}