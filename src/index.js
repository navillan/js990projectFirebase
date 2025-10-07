import ReactDOM from "react-dom/client";
import App from "./components/app.js";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "test-a1400.firebaseapp.com",
  projectId: "test-a1400",
  storageBucket: "test-a1400.firebasestorage.app",
  messagingSenderId: "419128128259",
  appId: "1:419128128259:web:8477f0f0f51e76dd8a2f36"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);