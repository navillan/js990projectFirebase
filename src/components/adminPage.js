import { useState, useEffect } from "react";
import AdminPaneli from "./adminPaneli.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AdminPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  if (email !== "" && password !== "") {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(isLoggedIn);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = signInWithEmailAndPassword(auth, email, password);
    console.log("login1:", success);
    
    if (success) {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      console.log("yeniLog:", success, isLoggedIn);
      
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("adminLoggedIn");
      alert("Kullanıcı adı veya parola hatalı.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    setEmail("");
    setPassword("");
    window.location.reload();
  };

  return (
    <div className="container">
      {!isLoggedIn && (
        <div className="login-box">
          <h2>Project Restaurant Admin Sayfası</h2>
          <form onSubmit={handleLogin}>
            <div className="user-box">
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label>Kullanıcı Adı</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label>Parola</label>
            </div>
            <div className="user-button">
              <button className="btn btn-admin-login" type="submit">Giriş</button>
            </div>
          </form>
        </div>
      )}
      {isLoggedIn && (        
        <div className="admin-page-container">
          <button type="button" className="btn btn-default btn-log-out" onClick={handleLogout}>
          <span className="glyphicon glyphicon-log-out"></span>Oturumu Kapat
          </button>
          <AdminPaneli />
        </div>
      )}
    </div>
   )
}
  

export default AdminPage;