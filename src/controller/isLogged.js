import { getAuth } from "firebase/auth";
import app from "./Firebase";

export default function isLogged() {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (user) {
    // User is signed in
    return user;
  } else {
    // No user is signed in.
    return false;
  }
}
