import { TeacherCard } from "@/components/teacher-card";
import { TopBar } from "@/components/topbar/top-bar";
import {
  getDataFromAllUserProfile,
  getDataFromUserWithSubject,
} from "@/controller/firestore";
import { User } from "@/types";
import { Center, Group, Title } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Filtered() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const { title } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (title) {
        const fetchedUsers = await getDataFromUserWithSubject(title.toString());
        setUsers(fetchedUsers);
      }
    };

    fetchData();
  }, [title]);

  return (
    <>
      <TopBar />
      <Center>
        <Title order={1}>{title}</Title>
      </Center>
      <Group p="xl" mx="xl" w="90%" spacing="xl">
        {users.map((user) => (
          <TeacherCard
            key={user.uid} // Assuming each user has a unique "uid" property
            {...user} // Spread the user object to pass its properties as individual props
          />
        ))}
      </Group>
    </>
  );
}
