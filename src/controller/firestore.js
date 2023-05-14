import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
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

export async function getDataFromUserProfile(userId) {
  const db = getFirestore(app);
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userData = querySnapshot.docs[0].data();
    return userData;
  } else {
    throw new Error("User not found");
  }
}

export async function deleteProfile(uid) {
  const db = getFirestore(app);
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(query(usersRef, where("uid", "==", uid)));

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0].ref;

    try {
      await deleteDoc(userDoc);
      console.log("User profile deleted successfully");
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  } else {
    console.error("User not found");
  }
}
