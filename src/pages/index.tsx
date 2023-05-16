import { useState, useEffect } from "react";
import { TopBar } from "@/components/topbar/top-bar";
import { Group } from "@mantine/core";
import { getDataFromAllUserProfile } from "@/controller/firestore.js";
import { TeacherCard } from "@/components/teacher-card";
import { User } from "@/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDataFromAllUserProfile();
      const usersData = snapshot.docs.map((doc) => doc.data() as User);
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <TopBar />
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
