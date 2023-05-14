import { addUserToFirestore } from "@/controller/firestore";
import { uploadFileToStorage } from "@/controller/firebase-storage";
import { handleImgInput } from "./handle-img-input";
import { use } from "react";
import { User } from "@/types";

export async function handleButtonClick(
  userPhoto: File | null,
  user: User,
  fileError: string
) {
  async function sendUserToFirestore() {
    let url;

    if (fileError) {
      return;
    }

    if (userPhoto && user.uid) {
      try {
        url = await uploadFileToStorage(user.uid, userPhoto);
        console.log("File uploaded successfully. URL:", url);
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle the error case
      }
    }

    const userToSend = {
      ...user,
      photoUrl: url, // Update the photoUrl in the user state
    };
    console.log(userToSend);

    try {
      const documentId = await addUserToFirestore(userToSend);
      console.log("User added to Firestore with ID:", documentId);
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  }

  await sendUserToFirestore();
}
