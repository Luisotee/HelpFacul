import { TopBar } from "@/components/topbar/top-bar";
import {
  Card,
  Center,
  FileInput,
  MultiSelect,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

export default function UserProfileCreationPage() {
  const subjects = [
    { value: "Matemática", label: "Matemática" },
    { value: "Estatística", label: "Estatística" },
    { value: "Eletrônica", label: "Eletrônica" },
    { value: "Química", label: "Química" },
    { value: "Elétrica", label: "Elétrica" },
    { value: "Banco de dados", label: "Banco de dados" },
  ];
  return (
    <>
      <TopBar />
      <Center>
        <Card shadow="sm" padding="lg" radius="md" w={864} withBorder>
          <TextInput placeholder="Seu nome" label="Nome" withAsterisk />
          <TextInput
            placeholder="Escreva uma breve descrição sobre você"
            label="Descrição"
            mt="lg"
            withAsterisk
          />
          <TextInput
            placeholder="Cidade que você poderá lecionar"
            label="Cidade"
            mt="lg"
            withAsterisk
          />
          <Textarea
            placeholder="Conte mais sobre você"
            label="Sobre você"
            autosize
            minRows={2}
            mt="lg"
            withAsterisk
          />
          <TextInput
            placeholder="Sua faculdade"
            label="Faculdade"
            mt="lg"
            withAsterisk
          />
          <TextInput
            placeholder="Email, whatsapp, linkedin, etc..."
            label="Contato"
            mt="lg"
            withAsterisk
          />
          <FileInput
            placeholder="Coloque a sua foto"
            label="Foto de perfil"
            icon={<IconUpload size={14} />}
            accept="image/png,image/jpeg"
            mt="lg"
            withAsterisk
          />
          <MultiSelect
            data={subjects}
            label="Matérias que você pode ensinar"
            placeholder="Escolha as que você se sente confiante em ensinar"
            mt="lg"
            withAsterisk
          />
          <NumberInput
            label="Valor que você quer receber por hora"
            defaultValue={10}
            parser={(value) => {
              // Remove any characters that are not digits, commas, or periods
              value = value.replace(/[^\d,.]/g, "");

              // Replace commas with periods for decimal point consistency
              value = value.replace(",", ".");

              // Remove any negative sign from the input value
              value = value.replace("-", "");

              return value;
            }}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `R$ ${value}`
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "R$ "
            }
            mt="lg"
            withAsterisk
          />
        </Card>
      </Center>
    </>
  );
}
