import { TopBar } from "@/components/topbar/top-bar";
import { recoverPassword } from "@/controller/firestore";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export default function PasswordRecover() {
  const { classes } = useStyles();
  const router = useRouter();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState("");

  function handleClickLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/login-page");
  }

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(email));
  }

  return (
    <>
      <TopBar />
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Esqueceu sua senha?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Insira o email da sua conta e receba um email para resetar a senha
        </Text>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Email"
            placeholder="voce@gmail.com"
            onChange={(event) => {
              setEmail(event.currentTarget.value);
              validateEmail(event.currentTarget.value);
            }}
            error={!isValidEmail}
            required
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor
              color="dimmed"
              size="sm"
              className={classes.control}
              onClick={handleClickLogin}
            >
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Box ml={5}>Voltar para o login</Box>
              </Center>
            </Anchor>
            <Button
              className={classes.control}
              onClick={() => recoverPassword(email)}
            >
              Resete a sua senha
            </Button>
          </Group>
        </Paper>
      </Container>
    </>
  );
}
