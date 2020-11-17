const Footer = () => {
    function renderPages(item) {
        let content = [];
        item.forEach((element, index) => {
            if(element.sSubContent) {
                content.push(
                    <li key={index}>
                        <div>
                            <h1>
                                <Link href={element.sLinkName}>{element.sName}</Link>
                            </h1>
                            <ul>
                                {renderPages(element.sSubContent)}
                            </ul>
                        </div>
                    </li>
                );
            } else {
                const name = element.sImage ? 
                    <img src={element.sImage} alt={element.sName}/> :
                    element.sName;

                content.push (
                    <li key={index}>
                        <span>
                            <Link href={element.sLinkName}>{name}</Link>
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