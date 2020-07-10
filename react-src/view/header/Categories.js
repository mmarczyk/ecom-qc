const Categories = () => {
    function renderMenu(item) {
        let content = [];
        item.forEach(element => {
            if(element.sSubContent) {
                content.push(
                    <li>
                        <a href={element.sLinkName}>{element.sName}</a>
                        <ul class="sub1">
                            {renderMenu(element.sSubContent)}
                        </ul>
                    </li>
                );
            } else {
                content.push (
                    <li>
                        <a href={element.sLinkName}>{element.sName}</a>
                    </li>
                );            
            }
        });

        return content;
    }

    let menu = renderMenu(sCategories);
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