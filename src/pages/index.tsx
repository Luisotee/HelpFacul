import { useState, useEffect } from "react";
import { TopBar } from "@/components/topbar/top-bar";
import { Group } from "@mantine/core";
import { getDataFromAllUserProfile } from "@/controller/firestore";
import { TeacherCard } from "@/components/teacher-card";
import { User } from "@/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDataFromAllUserProfile();
      const usersData = snapshot.docs.map((doc) => doc.data() as User);
      setUsers(usersData);
      console.log(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <TopBar />
      <Group p="xl" mx="xl" w="90%" position="apart" spacing="xl">
        {users.map((user) => (
          <TeacherCard
            key={user.uid} // Assuming each user has a unique "id" property
            name={user.name}
            university={user.university}
            avatar=""
            subjects={user.subjects}
            course={user.course}
          />
        ))}
      </Group>
    </>
  );
}
