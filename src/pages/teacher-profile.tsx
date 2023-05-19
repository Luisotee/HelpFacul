import { TeacherDetailBottomCard } from "@/components/teacher-profile/teacher-detail-bottom-card";
import { TeacherDetailUpperCard } from "@/components/teacher-profile/teacher-detail-upper-card";
import { TopBar } from "@/components/topbar/top-bar";
import { User } from "@/types";
import { Center, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserDetail() {
  const router = useRouter();
  const { data } = router.query;
  const user: User | null = data ? JSON.parse(data as string) : null;

  return (
    <>
      <TopBar />
      <Center>
        <Stack w={864}>
          <TeacherDetailUpperCard user={user} />
          <TeacherDetailBottomCard user={user} />
        </Stack>
      </Center>
    </>
  );
}
