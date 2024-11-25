// src/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRttM3UZdrEMtVxs8uBCNOj_2DBs5mXu0",
  authDomain: "app-clientes-web-tp-2024.firebaseapp.com",
  projectId: "app-clientes-web-tp-2024",
  storageBucket: "app-clientes-web-tp-2024.appspot.com",
  messagingSenderId: "765709702222",
  appId: "1:765709702222:web:c9f390205d2cda4ebe9f1f"
};

const app = initializeApp(firebaseConfig);

export default app;
