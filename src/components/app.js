import React, { useState } from "react";
import Selectors from "./mainSelectors.js";
import StepSelector from "./steps.js";
import AdminPage from "./adminPage.js";
import SelectorsEng from "./mainSelectorsEng.js";
import StepSelectorEng from "./stepsEng.js";

const App = () => {
  const [isEnglish, setIsEnglish] = useState(false);
  const path = window.location.pathname;
  const handleLanguageChange = (e) => {
    setIsEnglish(e.target.checked);
  };
  return path === "/admin"
  ? (<div><AdminPage /></div>)
  : (
    <div className="container">
      <div className="language-selector">
        <label className="label-tr" htmlFor="language">Türkçe</label>
        <label className="sliding-label">
          <input type="checkbox" id="language" checked={isEnglish} onChange={handleLanguageChange} />
          <span className="sliding-language"></span>
        </label>
        <label className="label-eng" htmlFor="language">English</label>
      </div>
      <h1 className="header-first">Project Restaurant</h1>
      <h3>Rezervasyon Sayfasına Hoşgeldiniz</h3>
      <div className="booking" id="booking">
        <div>
          {isEnglish ? <StepSelectorEng /> : <StepSelector />}
          {isEnglish ? <SelectorsEng /> : <Selectors />}
        </div>        
      </div>      
    </div>
  );
};

export default App;