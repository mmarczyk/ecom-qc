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