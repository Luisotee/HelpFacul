import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "./firebase";

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

export async function getDataFromAllUserProfile() {
  const db = getFirestore(app);
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);

  return snapshot;
}
