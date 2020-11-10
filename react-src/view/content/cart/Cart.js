const Cart = () => {
    useEffect(() => window.scrollTo(0, 0));

    if(oPageData.aCart && (typeof oPageData.aCart === 'object')){
        return (
            <div className="Cart">
                <List />
                <div>
                    <Shipping editable />
                    <Payments />
                </div>
                <Contact />
                <Summary />
            </div>
        );
    }
    else {
        return (
            <div className="Cart">
                Koszyk jest pusty
            </div>
        )
    }
};