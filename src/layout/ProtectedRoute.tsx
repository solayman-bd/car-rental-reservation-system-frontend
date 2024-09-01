import { logout, TUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useSelector((state: RootState) => state.auth).token;

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useDispatch();

  if (role !== undefined && role !== (user as TUser)?.role) {
    console.log("I a inside first");
    dispatch(logout());
    return <Navigate to="/sign-in" replace={true} />;
  }
  if (!token) {
    console.log("I a inside second");
    return <Navigate to="/sign-in" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
