import { TeacherCard } from "@/components/teacher-card";
import { TopBar } from "@/components/topbar/top-bar";
import { Group, Center, Title } from "@mantine/core";

export default function MathPage() {
  return (
    <>
      <TopBar />
      <Center>
        <Title order={1}>Matemática</Title>
      </Center>
      <Group p="xl" mx="xl" w="90%" position="apart" spacing="xl"></Group>
    </>
  );
}
