import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../index.js"


const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateGuest = async (id, completed) => {
    setLoading(true);
    try {
      const guestToUpdate = doc(db, 'reservations', id);
      debugger;
      await updateDoc(guestToUpdate, { completed: !completed });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { updateGuest, loading, error };
};

export default useUpdate;