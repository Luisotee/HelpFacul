import { handleImgInput } from "@/components/user-profile-creation-page-helpers/handle-img-input";
import { User } from "@/types";
import {
  Button,
  Center,
  FileInput,
  MultiSelect,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { handleButtonClick } from "./handle-button-click";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const MAX_DIMENSION = 10000;

type UserProfileCreationPageInputsProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  userPhoto: File | null;
  setUserPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  fileError: string;
  setFileError: React.Dispatch<React.SetStateAction<string>>;
  valid: boolean[];
  isFormValid: boolean;
};

export function UserProfileCreationPageInputs({
  user,
  setUser,
  userPhoto,
  setUserPhoto,
  fileError,
  setFileError,
  valid,
  isFormValid,
}: UserProfileCreationPageInputsProps) {
  const subjectsData = [
    { value: "Matemática", label: "Matemática" },
    { value: "Estatística", label: "Estatística" },
    { value: "Eletrônica", label: "Eletrônica" },
    { value: "Química", label: "Química" },
    { value: "Elétrica", label: "Elétrica" },
    { value: "Banco de dados", label: "Banco de dados" },
  ];
  return (
    <>
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
        onChange={(file) => {
          setUserPhoto(file);
          handleImgInput(file, setFileError, MAX_FILE_SIZE, MAX_DIMENSION);
        }}
        error={!valid[8] || !!fileError}
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
        <Button
          onClick={() => handleButtonClick(userPhoto, user, fileError)}
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </Center>
    </>
  );
}
