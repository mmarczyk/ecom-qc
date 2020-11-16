const Categories = () => {
    function renderMenu(item) {
        let content = [];
        item.forEach((element, index) => {
            if(element.sSubContent) {
                content.push(
                    <li key={index}>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                        <ul className="sub1">
                            {renderMenu(element.sSubContent)}
                        </ul>
                    </li>
                );
            } else {
                content.push (
                    <li key={index}>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                    </li>
                );            
            }
        });

        return content;
    }

    const menu = renderMenu(oCategories);

    return (
        <div className="Categories">
            <div className="nav">
                <i className="icofont-navigation-menu" />
            </div>
            <div>
                <div id="menu3">
                    <ul>
                        {menu}
                    </ul>
                </div>
            </div>
        </div>
    );
};