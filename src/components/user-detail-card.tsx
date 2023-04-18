import {
  Avatar,
  Badge,
  Card,
  Center,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";

export function UserDetailCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <div style={{ position: "relative" }}>
          <Image
            alt="test"
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            width={864}
            height={328}
          />

          <Avatar
            radius={60}
            src="https://avatars.githubusercontent.com/u/50471205?v=4"
            size={128}
            style={{ position: "absolute", bottom: -50, left: 15 }}
          />
        </div>
      </Card.Section>
      <Card.Section mt={50} p="xl">
        <Title order={3} fw="bold">
          Luís Otávio
        </Title>
        <Text>Aulas de calculo, fisica e quimica</Text>
        <Text>Sorocaba, faculdade Facens</Text>
        <Badge color="green" size="lg" mt="sm">
          R$40/hora
        </Badge>
      </Card.Section>
    </Card>
  );
}
