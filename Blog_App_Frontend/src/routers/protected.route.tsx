import { Navigate } from "react-router-dom";
import { IProtectedRoute } from "../types/route.type";
import { APP_ROUTES } from "../constants/route.constant";
import LoadingScreen from "../pages/loader";
import { useAuth } from "../context/auth/auth.context";

export const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const { authState } = useAuth();

  if (authState.isAuthenticated === undefined) {
    return <LoadingScreen />;
  }

  return authState.isAuthenticated ? children : <Navigate to={APP_ROUTES.LOGIN} />;
};
