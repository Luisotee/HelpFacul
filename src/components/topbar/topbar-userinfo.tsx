import { deleteProfile, deleteUser, logout } from "@/controller/firestore.js";
import isLogged from "@/controller/isLogged";
import { Avatar, Button, Group, Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Ad2, Edit, Logout, User, UserOff } from "tabler-icons-react";

export function TopBarUserInfo({ classes, theme }: any) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await isLogged();
      setUser(user);
    }

    fetchUser();
  }, []);

  function handleClickLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/login-page");
  }

  function handleClickSignup(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/signup-page");
  }

  function handleDeleteProfile(e: { preventDefault: () => void }) {
    e.preventDefault();
    deleteProfile(user);
  }

  function handleDeleteUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (user != null) {
      deleteUser();
    } else {
      alert("Erro! Tente novamente mais tarde.");
    }
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
            <Menu.Item icon={<User size={14} />}>Meu perfil</Menu.Item>
            <Menu.Item
              component="a"
              href="/user-profile-creation-page"
              icon={<Ad2 size={14} />}
            >
              Criar perfil
            </Menu.Item>
            <Menu.Item
              component="a"
              href="/user-profile-creation-page"
              icon={<Edit size={14} />}
            >
              Editar perfil
            </Menu.Item>
            <Menu.Item icon={<Logout size={14} />} onClick={logout}>
              Logout
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Zona de perigo</Menu.Label>
            <Menu.Item
              color="red"
              icon={<UserOff size={14} />}
              onClick={handleDeleteProfile}
            >
              Excluir perfil
            </Menu.Item>
            <Menu.Item
              color="red"
              icon={<IconTrash size={14} />}
              onClick={handleDeleteUser}
            >
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
