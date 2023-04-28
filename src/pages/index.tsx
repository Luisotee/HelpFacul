import { DarkTheme } from "@/components/darktheme";
import { TeacherCard } from "@/components/teacher-card";
import { TopBar } from "@/components/top-bar";
import { Center, Group } from "@mantine/core";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { user } = router.query;

  //console.log(user); // should output the stringified user object

  return (
    <>
      <TopBar />
      <Group p="xl" mx="xl" w="90%" position="apart" spacing="xl">
        <TeacherCard
          avatar="https://avatars.githubusercontent.com/u/50471205?v=4"
          name="Luis"
          university="Facens"
          subject="Matematica"
        />
        <TeacherCard
          avatar="https://avatars.githubusercontent.com/u/50471205?v=4"
          name="Luis"
          university="Facens"
          subject="Matematica"
        />
        <TeacherCard
          avatar="https://avatars.githubusercontent.com/u/50471205?v=4"
          name="Luis"
          university="Facens"
          subject="Matematica"
        />
        <TeacherCard
          avatar="https://avatars.githubusercontent.com/u/50471205?v=4"
          name="Luis"
          university="Facens"
          subject="Matematica"
        />
        <TeacherCard
          avatar="https://avatars.githubusercontent.com/u/50471205?v=4"
          name="Luis"
          university="Facens"
          subject="Matematica"
        />
      </Group>
    </>
  );
}
