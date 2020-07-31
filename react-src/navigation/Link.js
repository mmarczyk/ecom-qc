const Link = ({href, children}) => {
    const appendHref = (target) => {
        const json = target.search === '' ? '?json' :'&json';
        return [
            target.href,
            target.href + json
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