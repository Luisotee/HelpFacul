import { DarkTheme } from "@/components/darktheme";
import { LoginPage } from "@/components/login-page";
import { TeacherCard } from "@/components/teacher-card";
import { TopBar } from "@/components/top-bar";
import { Center, Group } from "@mantine/core";

export default function Home() {
  return (
    <>
      <DarkTheme />
      <Group spacing={50} position="center" p="xl">
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
