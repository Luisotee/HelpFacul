export async function handleImgInput(
  file: File | null,
  setFileError: React.Dispatch<React.SetStateAction<string>>,
  MAX_FILE_SIZE: number,
  MAX_DIMENSION: number
) {
  setFileError("");
  if (file && file.size > MAX_FILE_SIZE) {
    setFileError("File size exceeds the limit of 1MB");
    return;
  }

  if (file) {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    await new Promise<void>((resolve) => {
      image.onload = () => {
        if (image.width > MAX_DIMENSION || image.height > MAX_DIMENSION) {
          setFileError(
            `Image dimensions exceed the limit of ${MAX_DIMENSION}x${MAX_DIMENSION}`
          );
        } else {
          resolve();
        }
      };
    });
  }
}
