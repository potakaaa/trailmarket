import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const MyProfileRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user.id}`);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null;
};

export default MyProfileRedirect;
