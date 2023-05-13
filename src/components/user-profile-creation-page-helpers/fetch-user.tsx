import isLogged from "@/controller/isLogged";
import { User } from "@/types";

export async function fetchUser(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User>>
) {
  const uid = await isLogged();
  setLoading(false);
  setUser((prevUser) => ({ ...prevUser, uid: uid || "" }));
}
