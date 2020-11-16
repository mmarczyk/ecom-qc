const Cart = () => {
    useEffect(() => window.scrollTo(0, 0));

    if(oPageData.aCart && (typeof oPageData.aCart === 'object')){
        return (
            <div className="Cart">
                <CartItemList data="aCart"/>
                <div>
                    <Shipping editable />
                    <Payments />
                </div>
                <Contact />
                <Summary data='aCart'/>
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