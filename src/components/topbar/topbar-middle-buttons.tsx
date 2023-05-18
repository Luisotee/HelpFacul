import { mockdata } from "@/util/top-bar-style";
import {
  Box,
  Button,
  Center,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkTheme } from "./darktheme";

export function TopBarMiddleButtons({ classes, theme }: any) {
  const links = mockdata.map((item) => (
    <Link
      href={item.path}
      className={classes.subLink}
      key={item.title}
      style={{ textDecoration: "none" }}
    >
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
    </Link>
  ));

  const router = useRouter();
  function handleClickHome(e: { preventDefault: () => void }) {
    e.preventDefault();
    router.push("/");
  }
  return (
    <>
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
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
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
        <DarkTheme />
      </Group>
    </>
  );
}
