const formatStreet = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń0-9/]/g, ""),
      caretPos
  ];
};