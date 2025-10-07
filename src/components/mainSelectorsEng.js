import React from "react";


const SelectorsEng = ({ selectorId }) => {
  if (selectorId === "tarih") {
    Tarih();
    return (
      <div className="text-center" id="dateSelector">
        <p>Choose a date for your reservation</p>
        <input type="date" id="date" className="form-control" />
      </div>
    );
  }
  if (selectorId === "saat") {
    Saat();
    return (
      <div className="text-center" id="timeSelector">
        <p>Choose a time for your reservation</p>
        <input type="time" id="time" className="form-control" />
      </div>
    );
  }
  if (selectorId === "misafir") {
    Misafir();
    return (
      <div className="text-center" id="guestSelector">
        <p>Number of guests:</p>
        <input type="number" id="guests" className="form-control" />
      </div>
    );
  }
  if (selectorId === "tamamla") {
    Tamamla();
    return (
      <div className="text-center" id="completeSelector">
        <p>To complete your reservation, please click the button below</p>
        <button id="complete" className="btn btn-primary">Complete Reservation</button>
      </div>
    );
  }
  return null;
};

export default SelectorsEng;