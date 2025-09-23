import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../config/routes";

export function usePrefixedNavigate() {
  const navigate = useNavigate();

  return (to, options) => {
    if (typeof to === "string" && to.startsWith("/")) {
      navigate(`${BASE_PATH}${to}`, options);
    } else {
      navigate(to, options);
    }
  };
}
