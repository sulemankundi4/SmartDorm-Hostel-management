import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  isEmailVerified,
  isOwner,
  ownerRoute,
  redirect = '/',
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (!isEmailVerified) {
    return <Navigate to="/verifyEmail" />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to={redirect} />;
  }

  if (ownerRoute && !isOwner) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
