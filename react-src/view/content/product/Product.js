const Product = () => {
    return (
        <div className="Product">
            <Gallery/>
            <Title/>
            <Specification/>
            <div className="desc">
                <h1>Opis</h1>
                <div dangerouslySetInnerHTML={{__html: oPageData.sDescriptionFull}} />
            </div>
            <Shipping/>
        </div>
    );
};