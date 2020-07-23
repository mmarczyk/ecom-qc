const About = () => {
    if (oPageData && oPageData.aPages) {
        const aboutus = oPageData.aPages.map(element => {
            return (
                <li>
                    <div>
                        <h1>{element.sName}</h1>
                        <div dangerouslySetInnerHTML={{ __html: element.sDescriptionShort }} />
                    </div>
                </li>
            );
        });
        return (
            <div className="About">
                <ul>
                    {aboutus}
                </ul>
            </div>
        );
    }
};
