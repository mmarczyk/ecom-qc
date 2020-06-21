const Categories = () => {
    return (
        <div className="Categories">
            <div className="nav">
                <i className="icofont-navigation-menu" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: sCategories }}/>
        </div>
    );
};