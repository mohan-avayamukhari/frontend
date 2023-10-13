import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute = ({ children, isCollapsed, setIsCollapsed, isAuthenticated}) => {
  return isAuthenticated ? (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      {children}
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;