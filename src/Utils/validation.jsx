export const validateForm = {
  taiKhoan: (value) => {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 20) return "Username must not exceed 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(value))
      return "Username can only contain letters, numbers and underscore";
    return "";
  },

  matKhau: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return "";
  },

  email: (value) => {
    if (!value) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Invalid email address";
    }
    return "";
  },

  soDt: (value) => {
    if (!value) return "Phone number is required";
    if (!/^[0-9]{10,11}$/.test(value)) {
      return "Phone number must be 10-11 digits";
    }
    return "";
  },

  hoTen: (value) => {
    if (!value) return "Full name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value))
      return "Name can only contain letters and spaces";
    return "";
  },
};
