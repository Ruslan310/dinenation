import React, {useContext} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {MainContext} from "../../contexts/MainProvider";
import {ROLE} from "../../utils/utils";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const {userData} = useContext(MainContext);
  const location = useLocation();

  if (userData?.role !== ROLE.ADMIN) {
    return <Navigate to="/" state={{from: location}} />;
  }

  return <Component />;
};

export default ProtectedRoute;
