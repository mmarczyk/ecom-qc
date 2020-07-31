const Subcategories = () => {
    if ('aPages' in oPageData) {
        const subcategories = oPageData.aPages.map(element => {
            const img = element.sImage ? <img src={element.sImage.sFileName}/> : null;
            return (
                <li>
                    <Link href={element.sLinkName}>
                        <h1>{element.sName}</h1>
                        {img}
                        <div dangerouslySetInnerHTML={{ __html: element.sDescriptionShort }} />
                    </Link>
                </li>
            )
        });
        return (
            <div className="Subcategories">
                <ul>
                    {subcategories}
                </ul>
            </div>
        );
    }

    return null;
};