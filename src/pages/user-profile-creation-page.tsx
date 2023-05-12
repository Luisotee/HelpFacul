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
  const [user, setUser] = useState({
    name: "",
    description: "",
    city: "",
    aboutYou: "",
    university: "",
    course: "",
    contact: "",
    subjects: [] as string[],
    money: 0,
  });
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [loggedUser, setLoggedUser] = useState<any>(null);
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
      user.name.trim() !== "",
      user.description.trim() !== "",
      user.city.trim() !== "",
      user.aboutYou.trim() !== "",
      user.university.trim() !== "",
      user.contact.trim() !== "",
      user.subjects.length >= 1,
      user.money !== null && !isNaN(user.money),
      userPhoto != null,
      user.course.trim() !== "",
    ];
    setValid(isValid);
  }, [user, userPhoto]);

  useEffect(() => {
    async function fetchUser() {
      const user = await isLogged();
      setLoggedUser(user);
      setLoading(false);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !loggedUser) {
      router.push("/error-page");
    }
  }, [loading, loggedUser, router]);

  const handleButtonClick = () => {
    const userToSend = {
      ...user,
      uid: loggedUser?.uid,
    };
    console.log(userToSend);

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
            placeholder="João Pedro"
            label="Nome"
            value={user.name}
            onChange={(event) =>
              setUser({ ...user, name: event.currentTarget.value })
            }
            error={!valid[0]}
            description="Nome deve ter mais que um caractere"
            withAsterisk
          />

          <TextInput
            placeholder="Aulas de cálculo I e II"
            label="Breve descrição"
            mt="md"
            value={user.description}
            onChange={(event) =>
              setUser({ ...user, description: event.currentTarget.value })
            }
            error={!valid[1]}
            description="Descrição deve ter mais que um caractere"
            withAsterisk
          />
          <TextInput
            placeholder="Sorocaba, SP"
            label="Localização"
            mt="md"
            value={user.city}
            onChange={(event) =>
              setUser({ ...user, city: event.currentTarget.value })
            }
            error={!valid[2]}
            description="Cidade deve ter mais que um caractere"
            withAsterisk
          />
          <Textarea
            placeholder="Conte sobre quando você consegue dar aulas, lugar, conteudos, e qualquer coisa que você queira."
            label="Sobre você"
            autosize
            minRows={2}
            mt="md"
            value={user.aboutYou}
            onChange={(event) =>
              setUser({ ...user, aboutYou: event.currentTarget.value })
            }
            error={!valid[3]}
            description="Sobre você deve ter mais que um caractere"
            withAsterisk
          />
          <TextInput
            placeholder="Sua faculdade"
            label="Faculdade"
            mt="md"
            value={user.university}
            onChange={(event) =>
              setUser({ ...user, university: event.currentTarget.value })
            }
            error={!valid[4]}
            description="Faculdade você deve ter mais que um caractere"
            withAsterisk
          />
          <TextInput
            placeholder="Curso que você está matriculado"
            label="Curso"
            mt="md"
            value={user.course}
            onChange={(event) =>
              setUser({ ...user, course: event.currentTarget.value })
            }
            error={!valid[9]}
            description="Faculdade você deve ter mais que um caractere"
            withAsterisk
          />
          <TextInput
            placeholder="Email, whatsapp, linkedin, etc..."
            label="Contato"
            mt="md"
            value={user.contact}
            onChange={(event) =>
              setUser({ ...user, contact: event.currentTarget.value })
            }
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
            value={user.subjects}
            onChange={(selectedItems) =>
              setUser({ ...user, subjects: selectedItems as string[] })
            }
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
            value={user.money}
            onChange={(value) => setUser({ ...user, money: Number(value) })}
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
