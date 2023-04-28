import { mockdata, useStyles } from "@/util/top-bar-style";
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  Header,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  Avatar,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowsLeftRight,
  IconChevronDown,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Ad2, Book, User } from "tabler-icons-react";
import isLogged from "../controller/isLogged";

export function TopBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const router = useRouter();
  const user = isLogged();
  console.log("TOPBAR USER: " + JSON.stringify(user));

  function handleClickLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/login-page");
  }

  function handleClickHome(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/");
  }

  function handleClickSignup(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/signup-page");
  }

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={30}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <ActionIcon size="xl" onClick={handleClickHome}>
            <Book size={30} />
          </ActionIcon>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Button
              variant="subtle"
              className={classes.link}
              onClick={handleClickHome}
            >
              Home
            </Button>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Matérias
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Matérias</Text>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              Sobre
            </a>
          </Group>

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

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
