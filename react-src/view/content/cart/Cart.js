const Cart = () => {
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
};