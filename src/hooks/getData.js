import { collection, getDocs } from "firebase/firestore";
import { db } from "../index.js";
import { useEffect, useState } from "react";

const useGuests = () => {

  const [guests, setGuests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getReservations() {    
    setLoading(true);
    
    try {
    const response = await getDocs(collection(db, "reservations"));
    const guestsArray = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    setGuests(guestsArray);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
      
      useEffect(() => {
        getReservations();
      }, []);
    
      return { guests, error, loading, getReservations };
};

export default useGuests;
  
