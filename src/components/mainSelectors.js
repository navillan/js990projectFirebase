import React from "react";


const Selectors = ({ selectorId }) => {
  if (selectorId === "tarih") {
    Tarih();
    return (
      <div className="text-center" id="dateSelector">
        <p>Lütfen rezervasyon için bir tarih seçiniz</p>
        <input type="date" id="date" className="form-control" />
      </div>
    );
  }
  if (selectorId === "saat") {
    Saat();
    return (
      <div className="text-center" id="timeSelector">
        <p>Lütfen rezervasyon için bir saat seçiniz</p>
        <input type="time" id="time" className="form-control" />
      </div>
    );
  }
  if (selectorId === "misafir") {
    Misafir();
    return (
      <div className="text-center" id="guestSelector">
        <p>Misafir Sayısı:</p>
        <input type="number" id="guests" className="form-control" />
      </div>
    );
  }
  if (selectorId === "tamamla") {
    Tamamla();
    return (
      <div className="text-center" id="completeSelector">
        <p>Rezervasyonunuzu tamamlamak için lütfen aşağıdaki butona tıklayınız</p>
        <button id="complete" className="btn btn-primary">Rezervasyonu Tamamla</button>
      </div>
    );
  }
  return null;
};

export default Selectors;