import { User } from "@/types";
import { Avatar, Badge, Button, Center, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";

export function TeacherCard(user: User) {
  const router = useRouter();

  function handleClickDetail(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push({
      pathname: "/teacher-profile",
      query: { data: JSON.stringify(user) },
    });
  }

  const subjects = Array.isArray(user.subjects) ? user.subjects : [];

  return (
    <Paper
      key={user.uid} // Assign key prop to the Paper component
      radius="lg"
      w={330}
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
      style={{ borderColor: "lightgray" }}
    >
      <Avatar src={user.photoUrl} size={140} radius={120} mx="auto" />
      <Text ta="center" fz="xl" weight={500} mt="md">
        {user.name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.university} • {user.course}
      </Text>
      <Center>
        {subjects.map((subject, index) => (
          <Badge key={index} size="md" mt="md">
            {subject}
          </Badge>
        ))}
      </Center>
      <Text ta="center" mt="sm" fz="md" fw="bold">
        R${user.money}/hr
      </Text>

      <Button variant="default" fullWidth mt="md" onClick={handleClickDetail}>
        Detalhes
      </Button>
    </Paper>
  );
}
