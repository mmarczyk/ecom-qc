const genericFetch = (target, callback, options) => {
    const json = target.search === '' ? '?json' :'&json';
    const [orgHref, href] = [
        target.href,
        target.href + json
    ];
    
    fetch(href, options)
        .then(response => response.json())
        .then((data) => callback(data, orgHref));
};