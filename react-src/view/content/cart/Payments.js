const Payments = () => {
    if(oPageData && oPageData.aPayments) {
        const payments = oPageData.aPayments.map((element, index) => {
            return (
                <li key={index}>
                    <Radio
                        name="payment"
                        action={() => setPayment(element.iIdPayment)}
                        checked={
                            oPageData.aCart.oOrder.payment === element.iIdPayment
                    }/>
                    <span>{element.sName}</span>
                </li>
            );
        });
        
        return (
            <div className="Payments">
                <h1>Płatność</h1>
                <ul>
                    {payments}
                </ul>
            </div>
        );
    }
};