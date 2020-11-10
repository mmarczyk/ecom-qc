const formatName = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń]/g, ""),
      caretPos
  ];
};