import { createStyles, rem } from "@mantine/core";
import {
  Atom,
  Bolt,
  ChartInfographic,
  Cpu,
  Database,
  Math,
} from "tabler-icons-react";

export const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const mockdata = [
  {
    icon: Math,
    title: "Matemática",
    description: "Aulas de matemática",
    path: "/filtered?title=Matemática",
  },
  {
    icon: Atom,
    title: "Química",
    description: "Aulas de química",
    path: "/filtered?title=Química",
  },
  {
    icon: ChartInfographic,
    title: "Estatística",
    description: "Aulas de estatística",
    path: "/filtered?title=Estatística",
  },
  {
    icon: Bolt,
    title: "Elétrica",
    description: "Aulas de elétrica",
    path: "/filtered?title=Elétrica",
  },
  {
    icon: Cpu,
    title: "Eletrônica",
    description: "Aulas de eletrônica",
    path: "/filtered?title=Eletrônica",
  },
  {
    icon: Database,
    title: "Banco de dados",
    description: "Aulas de banco de dados",
    path: "/filtered?title=Banco de dados",
  },
];
