import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { DarkTheme } from "@/components/darktheme";
import { HeaderMegaMenu } from "@/components/top-bar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeaderMegaMenu />
    </>
  );
}
