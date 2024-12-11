import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7XNdMwGSECpXCJ_yR_yTRxauQEnDkDvI",
  authDomain: "auth-demo-f5426.firebaseapp.com",
  projectId: "auth-demo-f5426",
  storageBucket: "auth-demo-f5426.firebasestorage.app",
  messagingSenderId: "559840634332",
  appId: "1:559840634332:web:bd48a96718ed5a7927db19",
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
// const db = getFirestore(app);

// Exportiere die Instanzen von Auth und Firestore, um sie in anderen Dateien zu verwenden
export const auth = getAuth(app); // Für Authentifizierung
// export { db };
export default app;
