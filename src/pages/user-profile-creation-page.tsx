import { TopBar } from "@/components/topbar/top-bar";
import isLogged from "@/controller/isLogged";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addUserToFirestore } from "../controller/firestore";

export default function UserProfileCreationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [university, setUniversity] = useState("");
  const [contact, setContact] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [money, setMoney] = useState<number | "">(0);
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [valid, setValid] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const subjectsData = [
    { value: "Matemática", label: "Matemática" },
    { value: "Estatística", label: "Estatística" },
    { value: "Eletrônica", label: "Eletrônica" },
    { value: "Química", label: "Química" },
    { value: "Elétrica", label: "Elétrica" },
    { value: "Banco de dados", label: "Banco de dados" },
  ];

  useEffect(() => {
    const isValid = [
      name.trim() !== "",
      description.trim() !== "",
      city.trim() !== "",
      aboutYou.trim() !== "",
      university.trim() !== "",
      contact.trim() !== "",
      subjects.length >= 1,
      money != "" && money !== null && !isNaN(money),
      userPhoto != null,
    ];
    setValid(isValid);
  }, [
    name,
    description,
    city,
    aboutYou,
    university,
    contact,
    subjects,
    money,
    userPhoto,
  ]);

  useEffect(() => {
    async function fetchUser() {
      const user = await isLogged();
      setUser(user);
      setLoading(false);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/error-page");
    }
  }, [loading, user, router]);

  const handleButtonClick = () => {
    const userToSend = {
      name: name,
      description: description,
      city: city,
      aboutYou: aboutYou,
      university: university,
      contact: contact,
      subjects: subjects,
      money: money,
      uid: user?.uid,
    };

    addUserToFirestore(userToSend)
      .then((documentId) => {
        console.log("User added to Firestore with ID:", documentId);
      })
      .catch((error) => {
        console.error("Error adding user to Firestore:", error);
      });
  };

  const isFormValid = valid.every((isValid) => isValid);

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
            error={!valid[0]}
            description="Nome deve ter mais que um caractere"
            withAsterisk
          />

          <TextInput
            placeholder="Escreva uma breve descrição sobre você"
            label="Descrição"
            mt="md"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            error={!valid[1]}
            description="Descrição deve ter mais que um caractere"
            withAsterisk
          />
          <TextInput
            placeholder="Cidade que você poderá lecionar"
            label="Cidade"
            mt="md"
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
            error={!valid[2]}
            description="Cidade deve ter mais que um caractere"
            withAsterisk
          />
          <Textarea
            placeholder="Conte mais sobre você"
            label="Sobre você"
            autosize
            minRows={2}
            mt="md"
            value={aboutYou}
            onChange={(event) => setAboutYou(event.currentTarget.value)}
            error={!valid[3]}
            description="Sobre você deve ter mais que um caractere"
            withAsterisk
          />
          <TextInput
            placeholder="Sua faculdade"
            label="Faculdade"
            mt="md"
            value={university}
            onChange={(event) => setUniversity(event.currentTarget.value)}
            error={!valid[4]}
            description="Faculdade você deve ter mais que um caractere"
            withAsterisk
          />
          <TextInput
            placeholder="Email, whatsapp, linkedin, etc..."
            label="Contato"
            mt="md"
            value={contact}
            onChange={(event) => setContact(event.currentTarget.value)}
            error={!valid[5]}
            description="Contato você deve ter mais que um caractere"
            withAsterisk
          />
          <FileInput
            placeholder="Coloque a sua foto"
            label="Foto de perfil"
            icon={<IconUpload size={14} />}
            accept="image/png,image/jpeg"
            mt="md"
            value={userPhoto}
            onChange={setUserPhoto}
            error={!valid[8]}
            withAsterisk
          />
          <MultiSelect
            data={subjectsData}
            label="Matérias que você pode ensinar"
            placeholder="Escolha as que você se sente confiante em ensinar"
            mt="md"
            value={subjects}
            onChange={setSubjects}
            error={!valid[6]}
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
            mt="md"
            value={money}
            onChange={setMoney}
            error={!valid[7]}
            withAsterisk
          />
          <Center mt="xl">
            <Button onClick={handleButtonClick} disabled={!isFormValid}>
              Confirmar
            </Button>
          </Center>
        </Paper>
      </Center>
    </>
  );
}
