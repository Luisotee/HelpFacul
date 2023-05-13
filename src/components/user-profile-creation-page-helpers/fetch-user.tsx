import isLogged from "@/controller/isLogged";

export async function fetchUser({
  setLoggedUser,
  setLoading,
}: {
  setLoggedUser: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user = await isLogged();
  setLoggedUser(user);
  setLoading(false);
}
