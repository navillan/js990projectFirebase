import React from "react";


export const CheckDate = ({ selectedDate }) => {
  const gunAdi = new Date(selectedDate).toLocaleDateString('tr-TR', { weekday: 'long' });
  if (gunAdi !== "Pazartesi" && gunAdi !== "Pazar") {
    return false
  } else if (selectedDate === "Pazartesi" || "Pazar") {
    return true
  }
};

export const CheckForRezerv = ({ selectedDate, selectedTime, guests }) => {
 const isReserved = guests.filter(guest => 
    guest.selectedDate === selectedDate && guest.selectedTime === selectedTime
  ).length;
  return isReserved >= 4;
};

