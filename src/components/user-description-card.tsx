import { Card, Text, Title } from "@mantine/core";

export function UserDescriptionCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3}>Sobre</Title>
      <Text>OI tudo benmk diknjfniaujuijfod</Text>
      <Title order={3} mt="sm">
        Localização
      </Title>
      <Text>Sorocaba, São Paulo</Text>

      <Title order={3} mt="sm">
        Educação
      </Title>
      <Text>Faculdade de foda-se</Text>
      <Title order={3} mt="sm">
        Contato
      </Title>
      <Text>fodase@gmail.com</Text>
    </Card>
  );
}
