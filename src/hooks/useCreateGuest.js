import { collection, addDoc } from "firebase/firestore";
import { db } from "../index.js";

const useCreateGuest = () => {
  const createGuest = async ({
    selectedDate,
    selectedTime,
    selectedGuest,
    selectedName,
    selectedEmail,
    selectedPhone
  }) => {
    try {
      const docRef = await addDoc(collection(db, "reservations"), {
        selectedDate,
        selectedTime,
        selectedGuest,
        selectedName,
        selectedEmail,
        selectedPhone,
        completed: false,
        beklemeListesi: false
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return { createGuest };
};

export default useCreateGuest;