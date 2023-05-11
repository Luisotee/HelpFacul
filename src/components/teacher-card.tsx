import { Avatar, Badge, Button, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";

interface UserInfoActionProps {
  avatar: string;
  name: string;
  university: string;
  subjects: string[];
  course: string;
}

export function TeacherCard({
  avatar,
  name,
  university,
  subjects,
  course,
}: UserInfoActionProps) {
  const router = useRouter();

  function handleClickDetail(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/user-detail");
  }
  return (
    <Paper
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
      <Avatar src={avatar} size={140} radius={120} mx="auto" />
      <Text ta="center" fz="xl" weight={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {university} • {course}
      </Text>
      {subjects.map((subject, index) => (
        <Badge key={index} size="md" mt="md">
          {subject}
        </Badge>
      ))}

      <Button variant="default" fullWidth mt="md" onClick={handleClickDetail}>
        Detalhes
      </Button>
    </Paper>
  );
}
