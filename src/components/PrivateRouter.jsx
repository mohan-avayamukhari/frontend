import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute = ({ children, isCollapsed, setIsCollapsed }) => {
  // Replace the following line with your actual authentication logic
  const jwt = localStorage.getItem("jwt");
  const isAuthenticated = Boolean(jwt);

  return !isAuthenticated ? (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      {children}
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;