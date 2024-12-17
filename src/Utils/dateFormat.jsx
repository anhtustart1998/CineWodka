import { format } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  try {
    return format(new Date(date), "dd/MM/yyyy");
  } catch (error) {
    return "";
  }
};
