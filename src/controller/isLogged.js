import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";

export default function isLogged() {
  return new Promise((resolve) => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        resolve(user);
      } else {
        // No user is signed in
        resolve(false);
      }
    });
  });
}
