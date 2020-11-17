const genericFetch = (target, callback, options) => {
    const json = target.search === '' ? '?json' : '&json';
    const [orgHref, href] = [
        target.href,
        target.href + json
    ];
    
    fetch(href, options)
        .then(response => response.json())
        .then((data) => callback(data, orgHref));
};

const jsonToForm = json => {
    let form = '';
    for(let name in json) {
        form += name + '=' + encodeURIComponent(json[name]) + '&';
    };

    return form.substring(0, form.length - 1);
};