import isLogged from "@/controller/isLogged";
import { mockdata } from "@/util/top-bar-style";
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { TopBarUserInfo } from "./topbar-userinfo";
import { useEffect, useState } from "react";

export function TopBarMobileDrawer({
  drawerOpened,
  closeDrawer,
  classes,
  theme,
  toggleLinks,
  linksOpened,
}: any) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await isLogged();
      setUser(user);
    }

    fetchUser();
  }, []);

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
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      size="80%"
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

        <Group position="center" grow pb="xl" px="md" w="50%">
          {user ? (
            <TopBarUserInfo classes={classes} theme={theme} />
          ) : (
            <>
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </>
          )}
        </Group>
      </ScrollArea>
    </Drawer>
  );
}
