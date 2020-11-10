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