const Link = ({href, children}) => {
    return (
        <a href={href} onClick={navigateTo}>{children}</a>
    );
}