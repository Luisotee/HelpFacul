import { TopBar } from "@/components/topbar/top-bar";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";

import { auth } from "@/controller/Firebase";
import isLogged from "@/controller/isLogged";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

  const router = useRouter();

  const isUser = isLogged();

  if (isUser) {
    console.log("Usúario já está logado!");
    router.push("/");
    alert("Usúario já está logado!");
    return null;
  }

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(email));
  }

  function validatePassword(password: string) {
    setIsValidPassword(password.length >= 6);
  }

  function validateConfirmPassword(confirmPassword: string) {
    setIsValidConfirmPassword(confirmPassword === password);
  }

  async function onSubmit() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await sendEmailVerification(userCredential.user);
        const user = userCredential.user;
        //console.log(user);
        alert(
          "Cadastro concluido! Verifique seu email e faça o login na nova página."
        );
        router.push("/login-page");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode, errorMessage);
        alert(errorCode);
      });
  }

  const isFormValid = isValidEmail && isValidPassword && isValidConfirmPassword;

  return (
    <>
      <TopBar />
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Bem-vindo!
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="voce@gmail.com"
            description="Necessita email válido"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
              validateEmail(event.currentTarget.value);
            }}
            required
            error={!isValidEmail}
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            description="Senha precisa ter mais de 6 caracteres"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
              validatePassword(event.currentTarget.value);
            }}
            required
            error={!isValidPassword}
            mt="md"
          />
          <PasswordInput
            label="Confirme sua senha"
            placeholder="Sua senha"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.currentTarget.value);
              validateConfirmPassword(event.currentTarget.value);
            }}
            required
            error={!isValidConfirmPassword}
            mt="md"
          />
          <Button fullWidth mt="xl" onClick={onSubmit} disabled={!isFormValid}>
            Enviar cadastro
          </Button>
        </Paper>
      </Container>
    </>
  );
}
