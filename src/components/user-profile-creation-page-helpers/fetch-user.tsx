import { getDataFromUserProfile } from "@/controller/firestore.js";
import isLogged from "@/controller/isLogged";
import { User } from "@/types";

export async function fetchUser(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User>>
) {
  const uid = await isLogged();
  setLoading(false);
  try {
    if (uid) {
      const userData = await getDataFromUserProfile(uid);
      if (userData) {
        setUser((prevUser) => ({ ...prevUser, uid: uid, ...userData }));
      } else {
        setUser((prevUser) => ({ ...prevUser, uid: uid || "" }));
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle the error appropriately, such as displaying an error message or redirecting the user
  }
}
