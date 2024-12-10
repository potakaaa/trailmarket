import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const AdminPrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAdminLoggedIn } = useAuthContext();

  if (!isAdminLoggedIn) {
    return <Navigate to="/adminlogin" />;
  }

  return <>{children}</>;
};

export default AdminPrivateRoute;
