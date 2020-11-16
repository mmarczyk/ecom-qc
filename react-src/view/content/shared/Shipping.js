const Shipping = props => {
    if(oPageData && oPageData.aShipping) {
        const shipping = oPageData.aShipping.map((element, index) => {
            return (
                <li key={index}>
                    {props.editable && <Radio name="carrier"
                        action={() => setShippingCost(element)}
                        checked={
                            oPageData.aCart.oOrder.shipping.id === element.iIdShipping
                        }/>
                    }
                    <span>{element.sName}: {element.fPrice} zł</span>
                </li>
            );
        });

        return (
            <div className={props.editable ? "Shipping editable" : "Shipping"}>
                <h1>Dostawa</h1>
                <ul>
                    {shipping}
                </ul>
            </div>
        );
    }
};