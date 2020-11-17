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