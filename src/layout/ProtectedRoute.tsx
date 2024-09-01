import { logout, TUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  let user: unknown;
  if (token) {
    user = verifyToken(token);
  }

  useEffect(() => {
    if (role !== undefined && role !== (user as TUser)?.role) {
      dispatch(logout());
    }
  }, [dispatch, role, user]);

  if (role !== undefined && role !== (user as TUser)?.role) {
    return <Navigate to="/sign-in" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
