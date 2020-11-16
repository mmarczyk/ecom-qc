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