const OrderSummary = () => {
    useEffect(() => window.scrollTo(0, 0));

    if(oPageData.aOrder){
        return (
            <div className="OrderSummary">
                <h1>Dziękujemy za złożenie zamówienia w naszym sklepie.</h1>
                <span>Poniżej znajdują się szczegóły:</span>
            </div>
        );
    }
};