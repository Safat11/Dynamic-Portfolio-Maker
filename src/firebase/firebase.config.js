import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import Authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS_oM5V9dGt88JmYwoow9ntTTnE1b2_qY",
  authDomain: "preparing-dynamic-portfolio.firebaseapp.com",
  projectId: "preparing-dynamic-portfolio",
  storageBucket: "preparing-dynamic-portfolio.appspot.com",
  messagingSenderId: "686160534878",
  appId: "1:686160534878:web:6426df91717dd3846903cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Initialize Authentication

export { auth }; // ✅ Make sure auth is exported
export default app;
