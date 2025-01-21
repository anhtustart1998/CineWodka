import { format } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  try {
    return format(new Date(date), "dd/MM/yyyy");
  } catch (error) {
    return "";
  }
};

export const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Đảm bảo có 2 chữ số
  return `${hours}:${minutes}`;
};
