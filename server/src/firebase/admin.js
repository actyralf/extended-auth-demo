import admin from "firebase-admin";
import { readFileSync } from "fs";

// JSON-Datei lesen
try {
  const serviceAccount = JSON.parse(
    readFileSync(new URL("../../firebaseServiceAccount.json", import.meta.url))
  );

  // Firebase Admin SDK initialisieren
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("Error: ", error);
}

export default admin;
