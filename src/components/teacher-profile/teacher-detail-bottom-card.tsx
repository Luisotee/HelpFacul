import { User } from "@/types";
import { Card, Text, Title } from "@mantine/core";

export function TeacherDetailBottomCard({ user }: { user: User | null }) {
  if (!user) {
    return null; // Render nothing if user is null
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3}>Sobre</Title>
      <Text>{user.aboutYou}</Text>
      <Title order={3} mt="sm">
        Localização
      </Title>
      <Text>{user.city}</Text>

      <Title order={3} mt="sm">
        Educação
      </Title>
      <Text>{user.university}</Text>
      <Title order={3} mt="sm">
        Contato
      </Title>
      <Text>{user.contact}</Text>
    </Card>
  );
}
