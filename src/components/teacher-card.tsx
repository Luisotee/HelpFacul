import { User } from "@/types";
import { Avatar, Badge, Button, Group, Paper, Text } from "@mantine/core";
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
      h={450}
      shadow="xl"
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
      withBorder
    >
      <Avatar src={user.photoUrl} size={140} radius={120} mx="auto" />
      <Text ta="center" fz="xl" weight={500} mt="md">
        {user.name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.university} • {user.course}
      </Text>
      <div style={{ width: 288, height: 110 }}>
        {subjects.map((subject, index) => (
          <Badge
            key={index}
            size="md"
            mt="md"
            style={{ overflowWrap: "break-word" }}
          >
            {subject}
          </Badge>
        ))}
      </div>

      <Text ta="center" mt="sm" fz="md" fw="bold">
        R${user.money}/hr
      </Text>

      <Button variant="default" fullWidth mt="md" onClick={handleClickDetail}>
        Detalhes
      </Button>
    </Paper>
  );
}
