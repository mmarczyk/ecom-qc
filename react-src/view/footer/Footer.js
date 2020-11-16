const Footer = () => {
    function renderPages(item) {
        let content = [];
        item.forEach((element, index) => {
            if(element.sSubContent) {
                content.push(
                    <li key={index}>
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
                    <li key={index}>
                        <span>
                            <a href={element.sLinkName}>{element.sName}</a>
                        </span>
                    </li>
                );            
            }
        });

        return content;
    }

    const pages = renderPages(oMenu);

    return (
        <div className="Footer">
            <ul>
                {pages}
            </ul>
        </div>
    );
};