import { useCookies } from "react-cookie";

import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const [cookies] = useCookies(["token"]);
  console.log("cookies");
  return true ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
