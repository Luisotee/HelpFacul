import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFileToStorage(
  uid: string,
  file: File
): Promise<string> {
  const storage = getStorage();
  const storageRef = ref(storage, `users/${uid}/profile-photo/${file.name}`);
  await uploadBytes(storageRef, file);
  const photoUrl = await getDownloadURL(storageRef);
  return photoUrl;
}
