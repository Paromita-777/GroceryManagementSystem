import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  allowedRoles?: string[];
};

type User = {
  username: string;
  roles: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const token = localStorage.getItem("token");

  let user: User | null = null;

  try {
    const stored = localStorage.getItem("user");
    user = stored ? JSON.parse(stored) : null;
  } catch (e) {
    user = null;
  }

  // 1. Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role check
  if (
    allowedRoles &&
    !allowedRoles.some((role) => user.roles?.includes(role))
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}