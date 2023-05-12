import { useEffect } from "react";
import { TopBar } from "@/components/topbar/top-bar";
import { UserDescriptionCard } from "@/components/user-description-card";
import { UserDetailCard } from "@/components/user-detail-card";
import { User } from "@/types";
import { Center, Stack } from "@mantine/core";
import { useRouter } from "next/router";

export default function UserDetail() {
  const router = useRouter();
  const { data } = router.query;
  const user: User | null = data ? JSON.parse(data as string) : null;

  useEffect(() => {
    if (!user) {
      // User information is incomplete, redirect to the error page
      window.location.href = "/error-page";
    }
  }, [user]);

  return (
    <>
      <TopBar />
      <Center>
        <Stack w={864}>
          <UserDetailCard user={user} />
          <UserDescriptionCard user={user} />
        </Stack>
      </Center>
    </>
  );
}
