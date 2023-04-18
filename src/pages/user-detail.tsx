import { UserDescriptionCard } from "@/components/user-description-card";
import { UserDetailCard } from "@/components/user-detail-card";
import { Center, Stack } from "@mantine/core";

export default function UserDetail() {
  return (
    <Center mt="xl">
      <Stack>
        <UserDetailCard />
        <UserDescriptionCard />
      </Stack>
    </Center>
  );
}
