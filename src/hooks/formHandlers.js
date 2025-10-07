import React from "react";


  export const namePattern = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/g;
  export const emailPattern = /^[\w._-]+@[\w_-]+(\.[\w_-]{2,})+$/g;
  export const phonePattern = /^(\+90|0)?5[0345][0-9]{8}$/g; // +905xxx, 05xxx, 5xxx

  export const handleNameChange = (setSelectedName, setNameError, namePattern) => (e) => {
  setSelectedName(e.target.value);
  if (!namePattern.test(e.target.value)) {
    setNameError("Geçerli bir isim giriniz.");
  } else {
    setNameError("");
  }
};

export const handleEmailChange = (setSelectedEmail, setEmailError, emailPattern) => (e) => {
  setSelectedEmail(e.target.value);
  if (!emailPattern.test(e.target.value)) {
    setEmailError("Geçerli bir e-posta adresi giriniz.");
  } else {
    setEmailError("");
  }
};

export const handlePhoneChange = (setSelectedPhone, setPhoneError, phonePattern) => (e) => {
  setSelectedPhone(e.target.value);
  if (!phonePattern.test(e.target.value)) {
    setPhoneError("Geçerli bir telefon numarası giriniz.");
  } else {
    setPhoneError("");
  }
};