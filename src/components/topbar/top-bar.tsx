import isLogged from "@/controller/isLogged";
import { useStyles } from "@/util/top-bar-style";
import { ActionIcon, Box, Burger, Group, Header } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Book } from "tabler-icons-react";
import { TopBarMiddleButtons } from "./topbar-middle-buttons";
import { TopBarMobileDrawer } from "./topbar-mobile-drawer";
import { TopBarUserInfo } from "./topbar-userinfo";

export function TopBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const router = useRouter();
  const user = isLogged();

  function handleClickHome(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <Box pb={30}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <ActionIcon size="xl" onClick={handleClickHome}>
            <Book size={30} />
          </ActionIcon>

          <TopBarMiddleButtons classes={classes} theme={theme} />

          <TopBarUserInfo classes={classes} theme={theme} />

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>

        <TopBarMobileDrawer
          drawerOpened={drawerOpened}
          closeDrawer={closeDrawer}
          classes={classes}
          theme={theme}
          toggleLinks={toggleLinks}
          linksOpened={linksOpened}
        />
      </Header>
    </Box>
  );
}
