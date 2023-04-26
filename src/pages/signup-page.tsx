import { TopBar } from "@/components/top-bar";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../controller/firebase";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(email));
  }

  const router = useRouter();

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
        console.log(user);
        alert(
          "Cadastro concluido! Verifique seu email e faça o login na nova página."
        );
        router.push("/login-page");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
          Welcome!
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
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
            label="Password"
            placeholder="Your password"
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
            label="Confirm Password"
            placeholder="Your password"
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
            Sign up
          </Button>
        </Paper>
      </Container>
    </>
  );
}
