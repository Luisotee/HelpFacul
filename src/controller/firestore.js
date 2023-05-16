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
import { getAuth, signOut, deleteUser as deleteAuthUser } from "firebase/auth";

// Function to insert user data into Firestore collection
export async function addUserToFirestore(userInfo) {
  try {
    const db = getFirestore(app);
    const usersCollection = collection(db, "users");

    // Delete any existing profile with the same UID
    const querySnapshot = await getDocs(
      query(usersCollection, where("uid", "==", userInfo.uid))
    );

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0].ref;
      await deleteDoc(userDoc);
    }

    // Add user document to Firestore
    const newDocRef = await addDoc(usersCollection, userInfo);
    return newDocRef.id; // Resolve with the ID of the newly created document
  } catch (error) {
    throw error;
  }
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
    console.log("User not found");
    return null;
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
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  } else {
    console.error("User not found");
  }
}

export function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
      // Sign-out successful.
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

export async function deleteUser() {
  try {
    // Delete user authentication
    const auth = getAuth();
    const user = auth.currentUser;

    // Delete user profile before deleting account
    deleteProfile(user.uid);

    // Delete the user account
    await deleteAuthUser(user);
    console.log("User authentication deleted successfully");

    // Refresh the page or perform any other necessary actions
    window.location.reload();
  } catch (error) {
    console.error("Error deleting user:", error);
    logout();
    window.location.href = "/login-page";
  }
}
