import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


/*
const useCheckAdmin = () => {

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  

const validate = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/guests/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsValid(true);
        setLoading(false);
        return true;
      } else {
        setIsValid(false);
        setLoading(false);
        setError(data.message || "Giriş başarısız");
        return false;
      }
    } catch (err) {
      setError("Bağlantı hatası");
      setIsValid(false);
      setLoading(false);
      return false;
    }
  };  

  return { isValid, loading, error, signInWithEmailAndPassword };
};


export default useCheckAdmin;
*/