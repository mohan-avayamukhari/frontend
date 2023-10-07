import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute = ({ children, isCollapsed, setIsCollapsed, isAuthenticated,  setIsAuthenticated}) => {

  return isAuthenticated ? (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} setIsAuthenticated={setIsAuthenticated}>
      {children}
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;