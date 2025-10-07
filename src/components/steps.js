import React, { useEffect, useState } from "react";
import { CheckDate, CheckForRezerv } from "../hooks/checkForRez.js";
import useGuests from "../hooks/getData.js";
import useCreateGuest from "../hooks/useCreateGuest.js";

export default function StepSelector() {  

  const namePattern = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/g;
  const emailPattern = /^[\w._-]+@[\w_-]+(\.[\w_-]{2,})+$/g;
  const phonePattern = /^(\+90|0)?5[0345][0-9]{8}$/g;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;
  const maxDate = `2025-12-31`;

  const [selectorId, setSelectorId] = useState("date");
  const [beklemeListesi, setBeklemeListesi] = useState(false)
  const [selectedDate, setSelectedDate] = useState(minDate);
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [selectedGuest, setSelectedGuest] = useState("2");
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isReserved, setIsReserved] = useState(true);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { guests } = useGuests();
  const { createGuest } = useCreateGuest();
  
  useEffect(() => {
    const result = CheckDate({ selectedDate });
    setIsAvailable(result);
  }, [selectedDate]);

  useEffect(() => {
    const result = CheckForRezerv({ selectedDate, selectedTime, guests });
    
    setIsReserved(result);
  }, [selectedDate, selectedTime, guests ]);


  const handleNameChange = (e) => {
  setSelectedName(e.target.value);
  if (!namePattern.test(e.target.value)) {
    setNameError("Geçerli bir isim giriniz.");
  } else {
    setNameError("");
  }
};

const handleEmailChange = (e) => {
  setSelectedEmail(e.target.value);
  if (!emailPattern.test(e.target.value)) {
    setEmailError("Geçerli bir e-posta adresi giriniz.");
  } else {
    setEmailError("");
  }
};

const handlePhoneChange = (e) => {
  setSelectedPhone(e.target.value);
  if (!phonePattern.test(e.target.value)) {
    setPhoneError("Geçerli bir telefon numarası giriniz.");
  } else {
    setPhoneError("");
  }
};

const handleCreate = async () => {
  await createGuest({
    selectedDate,
    selectedTime,
    selectedGuest,
    selectedName,
    selectedEmail,
    selectedPhone
  });
};

  return (
    <div className="wrapper">
      <div className="wrapperSelector">
        <button className={`btn btn-primary${selectorId === "date" ? " selected-btn" : ""}`} onClick={() => setSelectorId("date")}>Tarih</button>
        <button className={`btn btn-primary${selectorId === "time" ? " selected-btn" : ""}`} onClick={() => setSelectorId("time")}>Saat</button>
        <button className={`btn btn-primary${selectorId === "guest" ? " selected-btn" : ""}`} onClick={() => setSelectorId("guest")}>Misafir</button>
        <button className={`btn btn-last-complete btn-primary${selectorId === "complete" ? " selected-btn" : ""}`}>Tamamla</button>
      </div>
      <hr></hr>
        <div className="wrapperSelected">
          <div className={selectorId === "date" ? "display-for-buttons" : "no-display-for-buttons"} id="dateSelector">
              <p className="selectorInfo">Rezervasyon yapmak istediğiniz tarihi seçiniz.</p>
              <input type="date" className="date-selector" id="start" value={selectedDate} min={minDate} max={maxDate} onChange={e => setSelectedDate(e.target.value)} />
              {isAvailable && 
              <div className="alert alert-danger" role="alert">
                <p className="alertP">Pazartesi ve Pazar günleri rezervasyon alınmamaktadır.</p>
              </div>}
              <button className={`completeChoice btn btn-primary${isAvailable ? " unavailable" : ""}`} 
                      onClick={() => setSelectorId("time")}
              >Seçimi Onayla</button>
          </div>
          <div className={selectorId === "time" ? "display-for-buttons" : "no-display-for-buttons"} id="timeSelector">
            <p className="selectorInfo">Rezervasyon yapmak istediğiniz saati seçiniz.</p>
            <div>
              <select className="time-selector" id="select1" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
                <option>18:00</option>
                <option>18:30</option>
                <option>19:00</option>
                <option>19:30</option>
                <option>20:00</option>
                <option>20:30</option>
                <option>21:00</option>
              </select>
            </div>
            {isReserved 
            ? <div className="alert alert-danger" role="alert">Seçtiğiniz tarih ve saat rezervasyona uygun değildir.</div>
            : <p>Seçtiğiniz tarih ve saat rezervasyona uygundur.</p>}
            <button className="completeChoice btn btn-primary" onClick={() => {if (!isReserved) setSelectorId("guest");}}disabled={isReserved}
            >Seçimi Onayla</button>
          </div>
          <div className={selectorId === "guest" ? "display-for-buttons" : "no-display-for-buttons"} id="guestSelector">
            <p className="selectorInfo">Rezervasyon yapmak istediğiniz kişi sayısını seçiniz.</p>
            <select className="guest-selector" id="select1" value={selectedGuest} onChange={e => setSelectedGuest(e.target.value)}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
            <button className="completeChoice btn btn-primary" 
                    onClick={() => {if (!isReserved) setSelectorId("complete");}}disabled={isReserved}
            >Seçimi Onayla</button>
          </div>
          <div className={selectorId === "complete" ? "display-for-buttons" : "no-display-for-buttons"} id="completeSelector">
            <div className="completionSelector">
              <p className="completionInfo"><strong>Seçilen Tarih:</strong> {new Date(selectedDate).toLocaleDateString("en-gb")}</p>
              <p className="completionInfo"><strong>Seçilen Saat:</strong> {selectedTime || <span style={{ color: "red" }}>"Seçilmedi!"</span>}</p>
              <p className="completionInfo"><strong>Kişi Sayısı:</strong> {selectedGuest}</p>
              <p className="completionInfo"><strong>Tam İsim:</strong> {selectedName || <span style={{ color: "red" }}>"Belirtilmedi!"</span>}</p>
              <p className="completionInfo"><strong>Eposta Adresi:</strong> {selectedEmail || <span style={{ color: "red" }}>"Belirtilmedi!"</span>}</p>
              <p className="completionInfo"><strong>Telefon Numarası:</strong> {selectedPhone || <span style={{ color: "red" }}>"Belirtilmedi!"</span>}</p>          
              <div className="input-container">
              <input className="inputLast input-field" placeholder="Tam adınızı giriniz" value={selectedName} onChange={handleNameChange} required />
              {nameError && <div style={{ color: "red" }}>{nameError}</div>}
              <label htmlFor="nameInput" className="input-label">Tam adınızı giriniz</label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <input className="inputLast input-field" placeholder="Eposta adresi giriniz" value={selectedEmail} onChange={handleEmailChange} required />
              {emailError && <div style={{ color: "red" }}>{emailError}</div>}
              <label htmlFor="emailInput" className="input-label">Eposta adresi giriniz</label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <input className="inputLast input-field" placeholder="Telefon numarası giriniz" value={selectedPhone} onChange={handlePhoneChange} required />
              {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
              <label htmlFor="phoneInput" className="input-label">Telefon numarası giriniz</label>
              <span className="input-highlight"></span>
            </div>
              <button className="rzv-complete btn btn-primary" onClick={() => {
                handleCreate();
                setSelectedName("");
                setSelectedEmail("");
                setSelectedPhone("");
                setNameError("");
                setEmailError("");
                setPhoneError("");
                setTimeout(() => window.location.reload(), 500);}} id="rzv-complete" disabled={!!nameError || !!emailError || !!phoneError || !selectedName || !selectedEmail || !selectedPhone}
                >Rezervasyonu Tamamla</button>
            </div>
          </div>
        <div className={selectorId === "beklemeListesi" ? "display-for-buttons" : "no-display-for-buttons"} id="beklemeListesi">
          <h2>Bekleme Listesi Formu</h2>
          <h6>Bu alan rezervasyon için değildir, seçtiğiniz tarihin ve saatin uygun olması durumunda sizinle iletişime geçilecektir.</h6>
            <p className="completionInfo"><strong>Seçilen Tarih:</strong> {new Date(selectedDate).toLocaleDateString("en-gb")}</p>
            <p className="completionInfo"><strong>Seçilen Saat:</strong> {selectedTime || <span style={{ color: "red" }}>"Seçilmedi!"</span>}</p>
            <p className="completionInfo"><strong>Kişi Sayısı:</strong> {selectedGuest}</p>
            <p className="completionInfo"><strong>Tam İsim:</strong> {selectedName || <span style={{ color: "red" }}>"Belirtilmedi!"</span>}</p>
            <p className="completionInfo"><strong>Eposta Adresi:</strong> {selectedEmail || <span style={{ color: "red" }}>"Belirtilmedi!"</span>}</p>
            <p className="completionInfo"><strong>Telefon Numarası:</strong> {selectedPhone || <span style={{ color: "red" }}>"Belirtilmedi!"</span>}</p>
            <div className="input-container">
              <input className="inputLast input-field" placeholder="Tam adınızı giriniz" value={selectedName} onChange={handleNameChange} required />
              {nameError && <div style={{ color: "red" }}>{nameError}</div>}
              <label htmlFor="nameInput" className="input-label">Tam adınızı giriniz</label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <input className="inputLast input-field" placeholder="Eposta adresi giriniz" value={selectedEmail} onChange={handleEmailChange} required />
              {emailError && <div style={{ color: "red" }}>{emailError}</div>}
              <label htmlFor="emailInput" className="input-label">Eposta adresi giriniz</label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <input className="inputLast input-field" placeholder="Telefon numarası giriniz" value={selectedPhone} onChange={handlePhoneChange} required />
              {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
              <label htmlFor="phoneInput" className="input-label">Telefon numarası giriniz</label>
              <span className="input-highlight"></span>
            </div>            
            <button className="rzv-complete btn btn-primary" onClick={() => {
              setSelectorId("beklemeListesi");
              setBeklemeListesi(true);
              setSelectedName("");
              setSelectedEmail("");
              setSelectedPhone("");
              setNameError("");
              setEmailError("");
              setPhoneError("");
              sendRequest();
              setTimeout(() => window.location.reload(), 500);}} 
              id="bklm-complete" disabled={!!nameError || !!emailError || !!phoneError || !selectedName || !selectedEmail || !selectedPhone}
             >Bekleme Listesine Ekle</button>
          </div>
        <hr></hr>
      </div>
      <div className="last-info">
        <p>Rezervasyon yapmak istediğiniz tarihlerde uygunluk bulamamanız durumunda,</p>
        <p> dilerseniz aşağıdaki form ile bekleme listesine dahil olabilirsiniz.</p>
        <p className="bekleme-listesi-tikla" onClick={() =>  setSelectorId("beklemeListesi")}>Bekleme Listesi Formu</p>
      </div>
    </div>
  );
}

