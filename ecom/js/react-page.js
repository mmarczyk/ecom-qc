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
        <Logo/>
        <UserInfo/>
        <Categories/>
        <Search />
    </div>
  );
};
const App = () => {
    return (
        <div className="App">
            <Header />
        </div>
    );
};
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
