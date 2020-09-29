const Submit = ({href, action, children}) => {
    return (
        <a href={href} onClick={action}>{children}</a>
    );
}