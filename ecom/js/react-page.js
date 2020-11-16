const App = () => {
    const dialog = showDialog ? showDialog : null;
    return (
        <div className="App">
            <Header/>
            <Content/>
            <Footer/>
            {dialog}
        </div>
    );
};
const addNavigateToCart = (target, productId) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            history.pushState({href: href}, '', href);
            oPageData = data;
            Animation.start();
            renderApp();
        },
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'iProductAdd='+productId+'&iQuantity=1'
        }
    );
    
    return false;
};
const addToCart = (target, productId) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
            renderApp();
        },
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'iProductAdd='+productId+'&iQuantity=1'
        }
    );
    
    return false;
};
const checkoutCart = (target) => {
    event.preventDefault();

    const sFirstName = oPageData.aCart.oOrder.name.split(' ', 1);
    const sLastName = oPageData.aCart.oOrder.name.split(' ').slice(1);
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
            renderApp();
        },
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: jsonToForm({
                sFirstName: sFirstName,
                sLastName: sLastName,
                sCompanyName: oPageData.aCart.oOrder.name,
                sStreet: oPageData.aCart.oOrder.street,
                sZipCode: oPageData.aCart.oOrder.zip,
                sCity: oPageData.aCart.oOrder.city,
                sPhone: oPageData.aCart.oOrder.phone,
                sEmail: oPageData.aCart.oOrder.email,
                sComment: oPageData.aCart.oOrder.comment,
                sShippingPayment: [
                    oPageData.aCart.oOrder.shipping.id,
                    oPageData.aCart.oOrder.payment,
                    oPageData.aCart.oOrder.shipping.price
                ].join(';'),
                iRules: 1,
                iRulesAccept: 1,
                sOrderSend: true
            })
        }
    );

    return false;
};
const navigateTo = (event) => {
    event.preventDefault();

    genericFetch(
        event.currentTarget,
        (data, href) => {
            history.pushState({href: href}, '', href);
            oPageData = data;
            Animation.start();
            renderApp();
        }
    );

    return false;
}
const removeFromCart = (target) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
            renderApp();
        }
    );
    
    return false;
};
const removeFromCartSingle = (target, productId, quantity) => {
    event.preventDefault();
    
    quantity -= 1;

    if(quantity > 0) { 
        genericFetch(
            target,
            (data, href) => {
                oPageData = data;
                renderApp();
            },
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'aProducts['+productId+']='+quantity
            }
        );
    }
    
    return false;
};
const setAcceptGdpr = () => {
    oPageData.aCart.bAcceptGdpr = !oPageData.aCart.bAcceptGdpr;
    renderApp();
}
const setAcceptRules = () => {
    oPageData.aCart.bAcceptRules = !oPageData.aCart.bAcceptRules;
    renderApp();
};
const setCity = (text) => {
    oPageData.aCart.oOrder.city = text;
    renderApp();
};
const setEmail = (text) => {
    oPageData.aCart.oOrder.email = text;
    renderApp();
};
const setOrderComment = (text) => {
    oPageData.aCart.oOrder.comment = text;
    renderApp();
};
const setOrderName = (text) => {
    oPageData.aCart.oOrder.name = text;
    renderApp();
};
const setPayment = (element) => {
    oPageData.aCart.oOrder.payment = element;
    renderApp();
};
const setPhone = (text) => {
    oPageData.aCart.oOrder.phone = text;
    renderApp();
};
const setShippingCost = (element) => {
    oPageData.aCart.oOrder.shipping = {
        price: element.fPrice,
        id: element.iIdShipping
    };
    renderApp();
};
const setStreet = (text) => {
    oPageData.aCart.oOrder.street = text;
    renderApp();
};
const setZip = (text) => {
    oPageData.aCart.oOrder.zip = text;
    renderApp();
};
const genericFetch = (target, callback, options) => {
    const json = target.search === '' ? '?json' :'&json';
    const [orgHref, href] = [
        target.href,
        target.href + json
    ];
    
    fetch(href, options)
        .then(response => response.json())
        .then((data) => callback(data, orgHref));
};

const jsonToForm = json => {
    let form = '';
    for(let name in json) {
        form += name + '=' + encodeURIComponent(json[name]) + '&';
    };

    return form.substring(0, form.length - 1);
};
const formatCity = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń]/g, ""),
      caretPos
  ];
};
const formatEmail = (text, caretPos) => {
    const email = text.split("@");

    email[0] = email[0]
        .replace(/^\.+/g, "")
        .replace(/\.\.+/g, ".")
        .replace(/[^A-Za-z0-9!#$%&'*+-/=?^_`{|}~]/g, "");

    if(email.length === 1) {
        return [
            email[0],
            caretPos
        ];
    } else {
        email[0] = email[0].replace(/\.+$/g, "");
        email[1] = email[1]
            .replace(/^\.+/g, "")
            .replace(/\.\.+/g, ".")
            .replace(/[^\.A-Za-z0-9]/g,"");
        
        return [
            email[0] + "@" + email[1],
            caretPos
        ];
    }
};
const formatName = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń]/g, ""),
      caretPos
  ];
};
const formatPhone = (text, caretPos) => {
    if(text.length > 0 && text.charAt(0) == '+') {
        text = "+" + text.replace(/\D/g, "");
    } else {
        text = text.replace(/\D/g, "");
    }

    if(text.length > 0) {
        if(text.charAt(0) === "0" && text.charAt(1) === "0") {
            text = text.length > 13 ? text.substring(0, 13) : text;
        } else if(text.charAt(0) === "+") {
            text = text.length > 12 ? text.substring(0, 12) : text;
        } else if(text.length > 9) {
            text = text.substring(0, 9);
        }
    }

    return [
        text,
        caretPos
    ];
};
const formatStreet = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń0-9/]/g, ""),
      caretPos
  ];
};
const formatZipCode = (text, caretPos) => {
  text = text.replace(/\D/g, "");

  for (let ind = text.length; ind < 5; ind++) {
    text += "_";
  }

  text = text.substr(0, 2) + "-" + text.substr(2, 3);
  if(text == '__-___') {
      caretPos = 0;
  } else if(caretPos == 3 && text.charAt(3) != '_') {
      caretPos += 1;
  }
  
  return [
      text,
      caretPos
  ];
};
const Animation = {
    init: () => {
        rootElement.classList.add("visible"), 100;
    },
    start: () => {
        rootElement.classList.remove("visible");
        setTimeout(() => rootElement.classList.add("visible"), 100);
    }
};

const Link = ({href, children}) => {
    return (
        <a href={href} onClick={navigateTo}>{children}</a>
    );
}
const Submit = ({className, href, action, disabled, children}) => {
    if(disabled) {
        if(className)
            className += " disabled";
        else
            className = "disabled";

        return (
            <a className={className}>{children}</a>
        );
    }
    return (
        <a className={className} href={href} onClick={action}>{children}</a>
    );
}
const Content = () => {
    let content = <Homepage />;
    if (window.location.search !== '') {
        content = null;
        if (window.location.search.match(/^\?\d+,.*$/)) {
            content = <Product />;
        } else if (oPageData.iProducts) {
            content = <Category />;
        } else if (oPageData.aCart) {
            content = <Cart />;
        } else if (oPageData.aOrder) {
            content = <Order />;
        } else {
            content = <CmsPage />;
        }
    }

    return (
        <div className="Content container">
            {content}
        </div>
    );
};
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
const Contact = () => {
    return (
        <div className="Contact">
            <div>
                <Textinput
                    name="name"
                    placeholder="Imię i nazwisko / Nazwa"
                    formatter={formatName}
                    bind={setOrderName}
                    value={oPageData.aCart.oOrder.name}
                />
                <Textinput
                    name="email"
                    placeholder="Adres email"
                    formatter={formatEmail}
                    bind={setEmail}
                    value={oPageData.aCart.oOrder.email}
                />
                <Textinput
                    name="tel"
                    placeholder="Nr telefonu"
                    formatter={formatPhone}
                    bind={setPhone}
                    value={oPageData.aCart.oOrder.phone}
                />
                <Textinput
                    name="street"
                    placeholder="Ulica i nr domu"
                    formatter={formatStreet}
                    bind={setStreet}
                    value={oPageData.aCart.oOrder.street}
                />
                <Textinput
                    name="zip"
                    placeholder="__-___"
                    formatter={formatZipCode}
                    bind={setZip}
                    value={oPageData.aCart.oOrder.zip}
                />
                <Textinput
                    name="city"
                    placeholder="Miejscowość"
                    formatter={formatCity}
                    bind={setCity}
                    value={oPageData.aCart.oOrder.city}
                />
            </div>
            <div>
                <Textinput
                    rows="7"
                    placeholder="Wpisz tutaj dodatkowe informacje"
                    name="info"
                    bind={setOrderComment}
                    value={oPageData.aCart.oOrder.comment}
                />
            </div>
            <div>
                <div>
                    <label>
                        <Checkbox
                            name="rules"
                            action={() => setAcceptRules()}
                            checked={oPageData.aCart.bAcceptRules}/>
                        Akceptuję regulamin sklepu dostępny tutaj.
                    </label>
                </div>
                <div>
                    <label>
                        <Checkbox
                            name="gdpr"
                            action={() => setAcceptGdpr()}
                            checked={oPageData.aCart.bAcceptGdpr}/>
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                        realizacji zamówienia.
                    </label>
                </div>
            </div>
        </div>
    );
};
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
const Category = () => {
    return (
        <div className="Category">
            <Description/>
            <Subcategories/>
            <ProductList/>
        </div>
    );
};
const Description = () => {
    return (
        <div className="Description">
            <h1>{oPageData.sName}</h1>
            <div dangerouslySetInnerHTML={{ __html: oPageData.sDescriptionShort }} />
        </div>
    );
};
const Subcategories = () => {
    if ('aPages' in oPageData) {
        const subcategories = oPageData.aPages.map((element, index) => {
            const img = element.sImage ? <img src={element.sImage.sFileName}/> : null;
            return (
                <li key={index}>
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
const CmsPage = () => {
    return (
        <div className="CmsPage">
            CMS
        </div>
    );
};
const Checkbox = props => {
  const { name, action, checked } = props;

  return (
    <div className="Checkbox">
      <input type="checkbox" name={name} onChange={action} checked={checked}/>
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
const Radio = props => {
  const { name, action, checked } = props;

  return (
    <div className="Radio">
      <input type="radio" name={name} onChange={action} checked={checked}/>
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
const Textinput = ({name, placeholder, formatter, bind, rows, value }) => {
    const onChangeHandler = event => {
        if(formatter) {
            let caretPos = event.target.selectionStart;
            [event.target.value, caretPos] =
                formatter(event.target.value, caretPos);
            event.target.selectionEnd = event.target.selectionStart = caretPos;
        }

        if(bind) {
            bind(event.target.value);
        }
    };
    if(rows && rows > 1) {
        return (
            <textarea
                name={name}
                placeholder={placeholder}
                rows={rows}
                onChange={onChangeHandler}
                value={value}
            />
        );
    } else {
        return (
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
            />
        );
    }
};
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

const Homepage = () => {
    return (
    <div className="Homepage">
      <TopBanner />
      <Popular />
      <About />
    </div>
  );
};
const Popular = () => {
    if (oPageData && oPageData.aProducts) {
        const products = oPageData.aProducts.map(element => {
            return (
                <li>
                    <h2>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                    </h2>
                    <div className="photo">
                        <Link href={element.sLinkName}>
                            <img src={element.sImage.sFileName} alt={element.sName} />
                        </Link>
                    </div>
                    <div className="price">
                        <em>Cena: </em>
                        <strong>{element.mPrice}</strong>
                        <span>zł</span>
                    </div>
                </li>
            );
        });
    
    return (
        <div className="Popular">
            <span>Popularne</span>
            <ProductList notitle/>
        </div>
    );
    }
};
const TopBanner = () => {
    const convert = element => {
        return (
            <li>
                <img src={element.sSizedImageLink} />
            </li>
        );
    };

    let imagesLeft = null;
    if (oPageData && oPageData.aImages && oPageData.aImages.left) {
        imagesLeft = (
            <ul className="imagesList" id="imagesList1">
                {oPageData.aImages.left.map(convert)}
            </ul>
        );
    }

    let imagesRight = null;
    if (oPageData && oPageData.aImages && oPageData.aImages.right) {
        imagesRight = (
            <ul className="imagesList" id="imagesList2">
                {oPageData.aImages.right.map(convert)}
            </ul>
        );
    }

    return (
        <div className="TopBanner">
            <div>
                {imagesLeft}
                {imagesRight}
            </div>
        </div>
    );
};
const Order = () => {
    useEffect(() => window.scrollTo(0, 0));

    if(oPageData.aOrder){
        oPageData.aOrder.oOrder = {
            shipping: {
               price: oPageData.aOrder.fPaymentShippingPrice
            }
        };

        return (
            <div className="Order">
                <OrderSummary />
                <CartItemList data="aOrder" readonly/>
                <Summary data='aOrder' readonly/>
            </div>
        );
    }
};
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
const Gallery = () => {
    if (oPageData && oPageData.aImages && oPageData.aImages.left) {
        const images = oPageData.aImages.left.map((element, index) => {
            return (
                <li key={index}>
                    <div className="nav">
                        <img src={element.sSizedImageLink} alt={element.sAlt} />
                    </div>
                    <div className="main">
                        <img src={element.sSizedImageLink} alt={element.sAlt} />
                    </div>
                </li>
            );
        });

        return (
            <div className="Gallery">
                <ul>
                    {images}
                </ul>
            </div>
        );
    }

    return (
        <div className="Gallery"/>
    );
};
const Product = () => {
    return (
        <div className="Product">
            <Gallery/>
            <Title/>
            <Specification/>
            <Reviews/>
            <Shipping/>
        </div>
    );
};
const Reviews = () => {
  return (
    <div className="Reviews">
      <ul>
        <li>
          <div>
            <h2>Tomasz napisała123:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

const Specification = () => {
  return (
    <div className="Specification">
      <ul>
        <li>
          <h1>Materiał</h1>
          <span>sznurek szary, ...</span>
        </li>
        <li>
          <h1>Wymiary</h1>
          <span>Wysokość: 20cm</span>
        </li>
      </ul>
      <div className="desc">
        <h1>Opis</h1>
        <span>{oPageData.sDescriptionFull}</span>
      </div>
    </div>
  );
};
const Title = () => {
  return (
    <div className="Title">
        <h1>{oPageData.sName}</h1>
        <span>{oPageData.mPrice} PLN</span>
        <Submit
            href={sCartPage}
            action={(event) => addNavigateToCart(event.currentTarget, oPageData.iProduct)}>
            Dodaj do koszyka
        </Submit>
    </div>
  );
};
const ProductList = (config) => {
    if (oPageData && oPageData.aProducts) {
        const products = oPageData.aProducts.map((element, index) => {
            const img = element.sImage ? element.sImage.sFileName : sDirImg + 'no-image.png';
            const name = element.sName.length > 27 ? element.sName.substring(0, 25) + '...' : element.sName;
            
            const nameBlock =
                config.notitle ?
                null :                     
                <div className="name">
                    <h3>
                        <Link href={element.sLinkName}>{name}</Link>
                    </h3>
                </div>;

            return (
                <li key={index}>
                    <div className="photo">
                        <Link href={element.sLinkName}>
                            <img src={img} alt={element.sName} />
                        </Link>
                    </div>
                    {nameBlock}
                    <div className="price">
                        <strong>{element.mPrice}</strong>
                        <span>zł</span>
                    </div>
                </li>
            );
        });
    
    return (
        <div className="ProductList">
            <ul>
                {products}
            </ul>
        </div>
    );
    }
};
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
const Summary = ({data, order}) => {
    const [amount, cost, total] = [
        oPageData[data].fTotalAmount,
        oPageData[data].oOrder.shipping.price,
        changePriceFormat(parseFloat(oPageData[data].fTotalAmount)
            + parseFloat(oPageData[data].oOrder.shipping.price))
    ];
    let submit = null;
    if(!order) {
        const isOrderReady = () =>
            oPageData.aCart.bAcceptRules == true &&
            oPageData.aCart.bAcceptGdpr == true &&
            oPageData.aCart.oOrder.shipping.id > 0 &&
            oPageData.aCart.oOrder.payment > 0 &&
            oPageData.aCart.oOrder.name.length > 0 &&
            oPageData.aCart.oOrder.street.length > 0 &&
            oPageData.aCart.oOrder.zip.length == 6 &&
            oPageData.aCart.oOrder.city.length > 0;

        submit = 
            <div>
                <Submit
                    href={sOrderPage}
                    action={(event) => checkoutCart(
                    event.currentTarget
                    )}
                    disabled={
                        !isOrderReady()}
                >
                    Zamów
                </Submit>
            </div>;
    } else {
        submit = 
            <div>
                <a href="http://wp.pl" target="_blank">
                    Zapłać
                </a>
            </div>;
    }

    const shipping = oPageData[data].mShipping ? "(" + oPageData[data].mShipping + ")" : null;
    
    return (
        <div className="Summary">
            <h1>Podsumowanie</h1>
            <div>
                <div>
                    <span>Koszt zakupów</span>
                    <span>{amount} zł</span>
                </div>
                <div>
                    <span>Koszt dostawy {shipping}</span>
                    <span>{cost} zł</span>
                </div>
                <div>
                    <span>Do zapłaty</span>
                    <span>{total} zł</span>
                </div>
                {submit}
            </div>
        </div>
    );
};
const Amount = ({product, readonly}) => {
    const buttonQuantityAdd = readonly ? null :
            <Submit
                href={sCartPage}
                action={(event) => removeFromCartSingle(
                    event.currentTarget, 
                    product.iProduct,
                    product.iQuantity
                )}
                disabled={product.iQuantity === 1}>
                <i className="icofont-rounded-down" />
            </Submit>;
    const buttonQuantityReduce = readonly ? null :
            <Submit
                href={sCartPage}
                action={(event) => addToCart(
                    event.currentTarget, 
                    product.iProduct
                )}>
                <i className="icofont-rounded-up" />
            </Submit>;

    return (
        <div className="Amount">
            {buttonQuantityAdd}
            <span>{product.iQuantity}</span>
            {buttonQuantityReduce}
        </div>
    );
};
const CartItemList = ({data, readonly}) => {
    if(data in oPageData && (typeof oPageData[data] === 'object')) {
        const products = oPageData[data].aProducts.map( (element, idx) => {
            return (
                <li key={idx}>
                    <ProductItem index={idx} data={data} readonly={readonly}/>
                </li>
            );
        });
        return (
            <div className="List">
                <div>
                    <ul>
                        {products}
                    </ul>
                </div>
            </div>
        );
    }
};
const ProductItem = ({data, index, readonly}) => {
    if(data in oPageData && (typeof oPageData[data] === 'object')) {
        if(index in oPageData[data].aProducts) {
            const product = oPageData[data].aProducts[index];
            const submit = readonly ? null : 
                <Submit
                    className="Remove"
                    href={product.sLinkDelete}
                    action={(event) =>
                            removeFromCart(event.currentTarget)}>
                    <i className="icofont-trash" />
                </Submit>;

            return (
                <div className="ProductItem">
                <div>
                    <Link href={product.sLinkName}>
                        <img src={product.sImage} alt={product.sName} />
                    </Link>
                </div>
                <div>
                    <div>
                        <span>{product.sName}</span>
                    </div>
                    <div>
                        <span>{product.fPrice} zł</span>
                        <Amount product={product} readonly={readonly}/>
                        <span>{product.fSummary} zł</span>
                        {submit}
                    </div>
                </div>
                </div>
            );
        }
    }
};
const Footer = () => {
    function renderPages(item) {
        let content = [];
        item.forEach((element, index) => {
            if(element.sSubContent) {
                content.push(
                    <li key={index}>
                        <div>
                            <h1>
                                <a href={element.sLinkName}>{element.sName}</a>
                            </h1>
                            <ul>
                                {renderPages(element.sSubContent)}
                            </ul>
                        </div>
                    </li>
                );
            } else {
                content.push (
                    <li key={index}>
                        <span>
                            <a href={element.sLinkName}>{element.sName}</a>
                        </span>
                    </li>
                );            
            }
        });

        return content;
    }

    const pages = renderPages(oMenu);

    return (
        <div className="Footer">
            <ul>
                {pages}
            </ul>
        </div>
    );
};
const CartIcon = () => {
  return (
    <div className="CartIcon">
        <Link href={sCartPage}>
            <i className="icofont-shopping-cart" />
        </Link>
    </div>
  );
};
const Categories = () => {
    function renderMenu(item) {
        let content = [];
        item.forEach((element, index) => {
            if(element.sSubContent) {
                content.push(
                    <li key={index}>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                        <ul className="sub1">
                            {renderMenu(element.sSubContent)}
                        </ul>
                    </li>
                );
            } else {
                content.push (
                    <li key={index}>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                    </li>
                );            
            }
        });

        return content;
    }

    const menu = renderMenu(oCategories);

    return (
        <div className="Categories">
            <div className="nav">
                <i className="icofont-navigation-menu" />
            </div>
            <div>
                <div id="menu3">
                    <ul>
                        {menu}
                    </ul>
                </div>
            </div>
        </div>
    );
};
const Header = () => {
  return (
    <div className="Header">
        <div className="container">
            <Logo/>
            <UserInfo/>
            <Categories/>
            <Search />
        </div>
    </div>
  );
};
const Logo = () => {
    const logo = sDirImg + "/logo.png";
    return (
        <div className="Logo">
            <Link href="./">
                <img src={logo} alt="logo" />
            </Link>
        </div>
    );
};
const Search = () => {
  return (
    <div className="Search">
        <div className="wrapper">
            <input type="text" name="query" />
        </div>
    </div>
  );
};
const UserInfo = () => {
  return (
    <div className="UserInfo">
        <div>
            <span>Zaloguj</span>
        </div>
        <CartIcon/>
    </div>
  );
};
const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

var showDialog = false;

const rootElement = document.getElementById("root");
const renderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        rootElement
    );
};

Animation.init();
renderApp();

window.onpopstate = (event) => {
    Animation.start();
    renderApp();
}
