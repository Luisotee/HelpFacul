import { TopBar } from "@/components/topbar/top-bar";
import { auth } from "@/controller/Firebase";
import isLogged from "@/controller/isLogged";
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

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

  const isFormValid = isValidEmail && isValidPassword;

  function handleClickSignup(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/signup-page");
  }

  function onSubmit() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const stringifiedUser = JSON.stringify(user);
        if (user.emailVerified) {
          console.log(user);
          router.push("/");
        } else {
          alert("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode, errorMessage);
        alert(errorCode);
      });
  }

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
          Bem-vindo de volta!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Ainda não tem uma conta?{" "}
          <Anchor size="sm" component="button" onClick={handleClickSignup}>
            Crie uma nova conta
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="voce@gmail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
              validateEmail(event.currentTarget.value);
            }}
            error={!isValidEmail}
            required
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
              validatePassword(event.currentTarget.value);
            }}
            error={!isValidPassword}
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Anchor component="button" size="sm">
              Esqueceu sua senha?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={onSubmit} disabled={!isFormValid}>
            Login
          </Button>
        </Paper>
      </Container>
    </>
  );
}
