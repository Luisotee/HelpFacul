import { addUserToFirestore } from "@/controller/firestore.js";
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
      } catch (error) {
        // Handle the error case
      }
    }

    const userToSend = {
      ...user,
      photoUrl: url, // Update the photoUrl in the user state
    };

    try {
      const documentId = await addUserToFirestore(userToSend);
      // Redirect the user to the home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  }

  await sendUserToFirestore();
}
