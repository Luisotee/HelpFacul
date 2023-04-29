import { TopBar } from "@/components/topbar/top-bar";
import {
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
            label="Compensação desejada por hora"
            mt="lg"
            defaultValue={0}
            parser={(value) => value.replace(/$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "$ "
            }
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
        </Paper>
      </Center>
    </>
  );
}
