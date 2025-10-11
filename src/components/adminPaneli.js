import { useState } from "react";
import UseGuests from "../hooks/getData.js";
import useDeleteGuest from "../hooks/useDeleteGuest.js";
import useCreateGuest from "../hooks/useCreateGuest.js";
import useUpdate from "../hooks/useUpdate.js";
import { namePattern, emailPattern, phonePattern, handleNameChange, handleEmailChange, handlePhoneChange} from "../hooks/formHandlers.js"

const AdminPaneli = () => {
  const { guests, error, loading, getReservations } = UseGuests();
  const [search, setSearch] = useState("");
  const [beklemeListesi, setBeklemeListesi] = useState("false")
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGuest, setSelectedGuest] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const onNameChange = handleNameChange(setSelectedName, setNameError, namePattern);
  const onEmailChange = handleEmailChange(setSelectedEmail, setEmailError, emailPattern);
  const onPhoneChange = handlePhoneChange(setSelectedPhone, setPhoneError, phonePattern);
  const { createGuest } = useCreateGuest();
  const { deleteGuest } = useDeleteGuest();
  const { updateGuest } = useUpdate();

  
  const filteredGuests = guests.filter(
    (guest) =>
    (guest.selectedName || "").toLowerCase().includes(search.toLowerCase()) ||
    (guest.selectedEmail || "").toLowerCase().includes(search.toLowerCase()) ||
    (guest.selectedPhone || "").toLowerCase().includes(search.toLowerCase()) ||
    (guest.selectedDate || "").toLowerCase().includes(search.toLowerCase())
);

  const handleCreate = async () => {
  await createGuest({
    selectedDate,
    selectedTime,
    selectedGuest,
    selectedName,
    selectedEmail,
    selectedPhone
  });
  getReservations();
};  

  const handleDelete = async (id) => {
    await deleteGuest(id);
    getReservations();
  };

  

  const handleUpdate = async (id, completed) => {
    updateGuest(id, completed);
    getReservations();
  };  

  return (
    <div className="admin-big-container">
      <h1>Prototype Restaurant Adminstration Page</h1>      
      <input type="text" placeholder="tarih" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}></input>
      <input type="text" placeholder="saat" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}></input>
      <input type="text" placeholder="misafir sayısı" value={selectedGuest} onChange={e => setSelectedGuest(e.target.value)}></input>
      <input type="text" placeholder="isim" value={selectedName} onChange={onNameChange}></input>
      <input type="text" placeholder="email" value={selectedEmail} onChange={onEmailChange}></input>
      <input type="text" placeholder="telefon numarası" value={selectedPhone} onChange={onPhoneChange}></input>
      <button onClick={() => handleCreate()} disabled={!!nameError || !!emailError || !!phoneError || !selectedName || !selectedEmail || !selectedPhone}>Ekle</button>
      <div>
        {nameError && <span>{nameError}</span>}
        {emailError && <span>{emailError}</span>}
        {phoneError && <span>{phoneError}</span>}
      </div>
      <br />      
      <p>Current Reservations:</p>
      <input
        type="text"
        placeholder="Tarih, isim, email, veya telefon numarası..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", width: "300px" }}
      />
      <br />
      <table border="1" cellPadding="3" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Bekleme Listesi</th>
          <th>Tarih</th>
          <th>Saat</th>
          <th>Misafirler</th>
          <th>İsim</th>
          <th>Email</th>
          <th>Telefon Numarası</th>
          <th>Onay Durumu</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {filteredGuests.map((guest) => (
          <tr key={guest.id}>
            <td>{guest.beklemeListesi ? "Bekleme Listesinde" : ""}</td>
            <td>{guest.selectedDate}</td>
            <td>{guest.selectedTime}</td>
            <td>{guest.selectedGuest}</td>
            <td>{guest.selectedName}</td>
            <td>{guest.selectedEmail}</td>
            <td>{guest.selectedPhone}</td>
            <td>{guest.completed ? "Yes" : "No"}</td>
            <td>
              <button className="admin-delete" onClick={() => handleDelete(guest.id)}>Sil</button>
            </td>
            <td>
              <input
                type="checkbox"
                className="admin-checkbox"                
                checked={guest.completed}
                onChange={() => handleUpdate(guest.id, guest.completed)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default AdminPaneli;