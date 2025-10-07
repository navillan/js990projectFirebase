import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../index.js";

const useDeleteGuest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteGuest = async (id) => {
    setLoading(true);
    try {
      const guestToDelete = doc(db, 'reservations', id);
      await deleteDoc(guestToDelete);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteGuest, loading, error };
};

export default useDeleteGuest;