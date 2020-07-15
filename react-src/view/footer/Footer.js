const Footer = () => {
    function renderPages(item) {
        let content = [];
        item.forEach(element => {
            if(element.sSubContent) {
                content.push(
                    <li>
                        <div>
                            <h1>
                                <a href={element.sLinkName}>{element.sName}</a>
                            </h1>
                            <ul>
                                {renderPages(element.sSubContent)}
                            </ul>
                        </div>
                    </li>
                );
            } else {
                content.push (
                    <li>
                        <span>
                            <a href={element.sLinkName}>{element.sName}</a>
                        </span>
                    </li>
                );            
            }
        });

        return content;
    }

    const pages = renderPages(oPages);

    return (
        <div className="Footer">
            <ul>
                {pages}
            </ul>
        </div>
    );
};