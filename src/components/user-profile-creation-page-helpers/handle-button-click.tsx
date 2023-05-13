import { addUserToFirestore } from "@/controller/firestore";
import { uploadFileToStorage } from "@/controller/firebase-storage";
import { handleImgInput } from "./handle-img-input";

export async function handleButtonClick(
  userPhoto: File | null,
  loggedUser: { uid?: string },
  user: any,
  fileError: string
) {
  async function sendUserToFirestore() {
    let url;

    if (fileError) {
      return;
    }

    if (userPhoto && loggedUser.uid) {
      url = await uploadFileToStorage(loggedUser.uid, userPhoto);
    }

    const userToSend = {
      ...user,
      photoUrl: url, // Update the photoUrl in the user state
      uid: loggedUser?.uid,
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
