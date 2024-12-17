export const validateImageFile = (file) => {
  if (!file) return true;
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  const extension = file.name.toLowerCase().split(".").pop();
  return (
    validTypes.includes(file.type) && validExtensions.includes(`.${extension}`)
  );
};
