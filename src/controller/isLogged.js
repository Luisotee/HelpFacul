import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";

export default function isLogged() {
  return new Promise((resolve) => {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        resolve(user.uid);
      } else {
        // No user is signed in
        resolve(false);
      }
    });
  });
}
