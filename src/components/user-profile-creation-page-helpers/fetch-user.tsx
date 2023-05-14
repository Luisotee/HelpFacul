import { getDataFromUserProfile } from "@/controller/firestore";
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
      const userData = await getDataFromUserProfile(
        "DCi7x9YzWNMFPu29u1DEfVXWkV52"
      );
      setUser((prevUser) => ({ ...prevUser, uid: uid, ...userData }));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle the error appropriately, such as displaying an error message or redirecting the user
  }
}
