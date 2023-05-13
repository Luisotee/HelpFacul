import { TopBar } from "@/components/topbar/top-bar";
import { fetchUser } from "@/components/user-profile-creation-page-helpers/fetch-user";
import { UserProfileCreationPageInputs } from "@/components/user-profile-creation-page-helpers/user-profile-creation-page-inputs";
import { Center, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserProfileCreationPage() {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fileError, setFileError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    description: "",
    city: "",
    aboutYou: "",
    university: "",
    course: "",
    contact: "",
    subjects: [] as string[],
    money: 0,
    photoUrl: "",
  });
  const [valid, setValid] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const isValid = [
      user.name.trim() !== "",
      user.description.trim() !== "",
      user.city.trim() !== "",
      user.aboutYou.trim() !== "",
      user.university.trim() !== "",
      user.contact.trim() !== "",
      user.subjects.length >= 1,
      user.money !== null && !isNaN(user.money),
      userPhoto != null,
      user.course.trim() !== "",
    ];
    setValid(isValid);
  }, [user, userPhoto]);

  useEffect(() => {
    fetchUser({ setLoggedUser, setLoading });
  }, []);

  useEffect(() => {
    if (!loading && !loggedUser) {
      router.push("/error-page");
    }
  }, [loading, loggedUser, router]);

  const isFormValid = valid.every((isValid) => isValid);

  return (
    <>
      <TopBar />
      <Center>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" w="40%">
          <UserProfileCreationPageInputs
            user={user}
            setUser={setUser}
            userPhoto={userPhoto}
            setUserPhoto={setUserPhoto}
            fileError={fileError}
            setFileError={setFileError}
            valid={valid}
            isFormValid={isFormValid}
            loggedUser={loggedUser}
          />
        </Paper>
      </Center>
    </>
  );
}
