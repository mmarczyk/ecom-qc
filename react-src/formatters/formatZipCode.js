const formatZipCode = (text, caretPos) => {
  text = text.replace(/\D/g, "");

  for (let ind = text.length; ind < 5; ind++) {
    text += "_";
  }

  text = text.substr(0, 2) + "-" + text.substr(2, 3);
  if(text == '__-___') {
      caretPos = 0;
  } else if(caretPos == 3 && text.charAt(3) != '_') {
      caretPos += 1;
  }
  
  return [
      text,
      caretPos
  ];
};