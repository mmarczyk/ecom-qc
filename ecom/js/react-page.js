const Footer = () => {
    function renderPages(item) {
        let content = [];
        item.forEach(element => {
            if(element.sSubContent) {
                content.push(
                    <li>
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
                    <li>
                        <span>
                            <a href={element.sLinkName}>{element.sName}</a>
                        </span>
                    </li>
                );            
            }
        });

        return content;
    }

    const pages = renderPages(oPages);

    return (
        <div className="Footer">
            <ul>
                {pages}
            </ul>
        </div>
    );
};
const Categories = () => {
    function renderMenu(item) {
        let content = [];
        item.forEach(element => {
            if(element.sSubContent) {
                content.push(
                    <li>
                        <a href={element.sLinkName}>{element.sName}</a>
                        <ul class="sub1">
                            {renderMenu(element.sSubContent)}
                        </ul>
                    </li>
                );
            } else {
                content.push (
                    <li>
                        <a href={element.sLinkName}>{element.sName}</a>
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
const Search = () => {
  return (
    <div className="Search">
        <div className="wrapper">
            <input type="text" name="query" />
        </div>
    </div>
  );
};
const CartIcon = () => {
  return (
    <div className="CartIcon">
        <i className="icofont-shopping-cart" />
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
const Logo = () => {
    const logo = sDirImg + "/logo.png";
    return (
        <div className="Logo">
            <img src={logo} alt="logo" />
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
const About = () => {
    const aboutus = oAboutUs.map(element => {
        return (
            <li>
                <div>
                    <h1>{element.sName}</h1>
                    <div dangerouslySetInnerHTML={{__html: element.sDescriptionShort}}/>
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
};

const Popular = () => {
    const products = oProducts.map(element => {
        return (
            <li>
                <h2>
                    <a href={element.sLinkName}>{element.sName}</a>
                </h2>
                <div class="photo">
                    <a href={element.sLinkName}>
                        <img src={element.sImage.sFileName} alt={element.sName}/>
                    </a>
                </div>
                <div class="price">
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
            <div>
                <ul>
                    {products}
                </ul>
            </div>
        </div>
    );
};
const TopBanner = () => {
    let imagesLeft = null;
    let imagesRight = null;

    const convert = element => {
        return (
            <li>
                <a href={element.sFullImageLink}>
                    <img src={element.sSizedImageLink}/>
                </a>
            </li>
        );
    };

    imagesLeft = oImages.left.map(convert);
    imagesRight = oImages.right.map(convert);

    return (
        <div className="TopBanner">
            <div>
                <ul class="imagesList" id="imagesList1">
                    {imagesLeft}
                </ul>
                <ul class="imagesList" id="imagesList2">
                    {imagesRight}
                </ul>
            </div>
        </div>
    );
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
const Content = () => {
  return (
    <div className="Content container">
        <Homepage />
    </div>
  );
};
const App = () => {
    return (
        <div className="App">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
};
const useState = React.useState;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
