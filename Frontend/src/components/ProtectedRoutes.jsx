import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { loggedin } = useSelector((state) => state.loginAdmin);

  useEffect(() => {
    if (!loggedin) {
      navigate("/login");
    }
  }, [loggedin, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
