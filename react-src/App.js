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