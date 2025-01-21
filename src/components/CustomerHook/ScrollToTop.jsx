import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi route thay đổi
  }, [location]);

  return null; // Component này không cần render gì cả
};

export default ScrollToTop;
