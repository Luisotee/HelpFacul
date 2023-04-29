import isLogged from "@/controller/isLogged";
import { Avatar, Button, Group, Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Ad2, Logout, User } from "tabler-icons-react";

export function TopBarUserInfo({ classes, theme }: any) {
  const router = useRouter();
  const user = isLogged();
  console.log("TOPBAR USER: " + JSON.stringify(user));

  function handleClickLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/login-page");
  }

  function handleClickSignup(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/signup-page");
  }

  return (
    <>
      {user ? (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              radius="xl"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            >
              <Avatar radius="xl" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<User size={14} />}>Meu cadastro</Menu.Item>
            <Menu.Item icon={<Ad2 size={14} />}>Meus anúncios</Menu.Item>
            <Menu.Item icon={<Logout size={14} />}>Log out</Menu.Item>
            <Menu.Divider />
            <Menu.Label>Zona de perigo</Menu.Label>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Excluir conta
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Group className={classes.hiddenMobile}>
          <Button variant="default" onClick={handleClickLogin}>
            Log in
          </Button>
          <Button onClick={handleClickSignup}>Sign up</Button>
        </Group>
      )}
    </>
  );
}
