import { Navigate, useNavigate } from "react-router-dom";
import modalStore from "../store/modalStore";
import { useEffect } from "react";

const LoginRequired = () => {
  const openLoginModal = modalStore((state) => state.openLoginModal);
  const navigate = useNavigate();
  useEffect(() => {
    openLoginModal({
        onLogin: () => {
          navigate(location.pathname, { replace: true });
        },
        onClose: () => {
          navigate("/", { replace: true });
        }
    });
  }, []);

};

export default LoginRequired;
