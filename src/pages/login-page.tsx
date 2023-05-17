import { TopBar } from "@/components/topbar/top-bar";
import { auth } from "@/controller/firebase";
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
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function checkUserLoggedIn() {
      const uid = await isLogged();
      if (uid) {
        console.log("User is already logged in!");
        router.push("/");
      }
      setLoading(false);
    }

    checkUserLoggedIn();
  }, [router]);

  if (typeof window === "undefined" || loading) {
    return null; // Return null during server-side rendering or while loading
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

  function handleClickRecover(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/password-recover");
  }

  async function onSubmit() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        router.push("/");
      } else {
        alert("Please verify your email before logging in.");
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert(errorCode);
    }
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
            <Anchor component="button" size="sm" onClick={handleClickRecover}>
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
