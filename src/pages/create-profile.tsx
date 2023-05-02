import { TopBar } from "@/components/topbar/top-bar";
import {
  Button,
  Center,
  MultiSelect,
  NumberInput,
  Paper,
  TextInput,
  Textarea,
} from "@mantine/core";

const subjects = [
  { value: "calculo I", label: "Calculo I" },
  { value: "calculo II", label: "Calculo II" },
  { value: "calculo III", label: "Calculo III" },
  { value: "calculo IV", label: "Calculo IV" },
  { value: "fisica I", label: "Fisica I" },
  { value: "resistencia dos materiais", label: "Resistência dos materiais" },
];

export default function CreateProfile() {
  return (
    <>
      <TopBar />
      <Center>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" w="40%">
          <TextInput
            placeholder="Nome completo"
            label="Nome completo"
            withAsterisk
          />
          <Textarea
            placeholder="Fale sobre você"
            label="Descrição"
            mt="lg"
            withAsterisk
          />
          <MultiSelect
            data={subjects}
            label="Matérias que você pode ajudar"
            mt="lg"
            placeholder="Selecione todas que você queira"
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
          <TextInput
            placeholder="Sua faculdade"
            label="Faculdade que estuda"
            mt="lg"
            withAsterisk
          />
          <TextInput
            placeholder="Sua cidade que você poderá trabalhar"
            label="Cidade"
            mt="lg"
            withAsterisk
          />
          <Textarea
            placeholder="Formas que podem te contatar, emails, whatsapp, telefones, etc"
            label="Contato"
            mt="lg"
            withAsterisk
          />
          <Center mt="xl">
            <Button>Confirmar</Button>
          </Center>
        </Paper>
      </Center>
    </>
  );
}
