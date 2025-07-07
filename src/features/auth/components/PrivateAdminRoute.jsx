import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateAdminRoute;
