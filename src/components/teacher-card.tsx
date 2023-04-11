import { Avatar, Text, Button, Paper, Badge } from "@mantine/core";

interface UserInfoActionProps {
  avatar: string;
  name: string;
  university: string;
  subject: string;
}

export function TeacherCard({
  avatar,
  name,
  university,
  subject,
}: UserInfoActionProps) {
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
        {university} • {subject}
      </Text>
      <Badge size="md" mt="md">
        Fisica Aplicada
      </Badge>
      <Badge size="md" mt="md">
        Calculo I
      </Badge>
      <Badge size="md" mt="md">
        Calculo II
      </Badge>
      <Badge size="md" mt="md">
        Calculo III
      </Badge>
      <Badge size="md" mt="md">
        Resistencia dos materiais
      </Badge>
      <Text ta="center" mt="sm" fz="md" fw="bold">
        R$40/hr
      </Text>
      <Button variant="default" fullWidth mt="md">
        Detalhes
      </Button>
    </Paper>
  );
}
