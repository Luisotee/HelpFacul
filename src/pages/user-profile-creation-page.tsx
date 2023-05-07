import { TopBar } from "@/components/topbar/top-bar";
import {
  Button,
  Center,
  FileInput,
  MultiSelect,
  NumberInput,
  Paper,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { addUserToFirestore } from "../controller/firestore";

export default function UserProfileCreationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [university, setUniversity] = useState("");
  const [contact, setContact] = useState("");
  const [subjects, setSubjects] = useState([""]);
  const [money, setMoney] = useState<number | "">(0);
  const [userPhoto, setUserPhoto] = useState<File | null>(null);

  const subjectsData = [
    { value: "Matemática", label: "Matemática" },
    { value: "Estatística", label: "Estatística" },
    { value: "Eletrônica", label: "Eletrônica" },
    { value: "Química", label: "Química" },
    { value: "Elétrica", label: "Elétrica" },
    { value: "Banco de dados", label: "Banco de dados" },
  ];

  const handleButtonClick = () => {
    const user = {
      name: name,
      description: description,
      city: city,
      aboutYou: aboutYou,
      university: university,
      contact: contact,
      subjects: subjects,
      money: money,
    };

    console.log(user);

    addUserToFirestore(user)
      .then((documentId) => {
        console.log("User added to Firestore with ID:", documentId);
      })
      .catch((error) => {
        console.error("Error adding user to Firestore:", error);
      });
  };

  return (
    <>
      <TopBar />
      <Center>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" w="40%">
          <TextInput
            placeholder="Seu nome"
            label="Nome"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            withAsterisk
          />
          <TextInput
            placeholder="Escreva uma breve descrição sobre você"
            label="Descrição"
            mt="lg"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            withAsterisk
          />
          <TextInput
            placeholder="Cidade que você poderá lecionar"
            label="Cidade"
            mt="lg"
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
            withAsterisk
          />
          <Textarea
            placeholder="Conte mais sobre você"
            label="Sobre você"
            autosize
            minRows={2}
            mt="lg"
            value={aboutYou}
            onChange={(event) => setAboutYou(event.currentTarget.value)}
            withAsterisk
          />
          <TextInput
            placeholder="Sua faculdade"
            label="Faculdade"
            mt="lg"
            value={university}
            onChange={(event) => setUniversity(event.currentTarget.value)}
            withAsterisk
          />
          <TextInput
            placeholder="Email, whatsapp, linkedin, etc..."
            label="Contato"
            mt="lg"
            value={contact}
            onChange={(event) => setContact(event.currentTarget.value)}
            withAsterisk
          />
          <FileInput
            placeholder="Coloque a sua foto"
            label="Foto de perfil"
            icon={<IconUpload size={14} />}
            accept="image/png,image/jpeg"
            mt="lg"
            value={userPhoto}
            onChange={setUserPhoto}
            withAsterisk
          />
          <MultiSelect
            data={subjectsData}
            label="Matérias que você pode ensinar"
            placeholder="Escolha as que você se sente confiante em ensinar"
            mt="lg"
            value={subjects}
            onChange={setSubjects}
            withAsterisk
          />
          <NumberInput
            label="Valor que você quer receber por hora"
            defaultValue={10}
            parser={(value) => {
              value = value.replace(/[^\d,.]/g, "");
              value = value.replace(",", ".");
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
            value={money}
            onChange={setMoney}
            withAsterisk
          />
          <Center mt="xl">
            <Button onClick={handleButtonClick}>Confirmar</Button>
          </Center>
        </Paper>
      </Center>
    </>
  );
}
