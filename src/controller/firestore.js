import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "./firebase";

// Initialize Firebase app (ensure you have already configured your Firebase project)

// Function to insert user data into Firestore collection
export function addUserToFirestore(userInfo) {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    const usersCollection = collection(db, "users");

    // Add user document to Firestore
    addDoc(usersCollection, userInfo)
      .then((docRef) => {
        resolve(docRef.id); // Resolve with the ID of the newly created document
      })
      .catch((error) => {
        reject(error);
      });
  });
}
