import React, {useContext} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {MainContext} from "../../contexts/MainProvider";
import {PageConfig, ROLE} from "../../utils/utils";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  customer?: ROLE;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, customer}) => {
  const {userData} = useContext(MainContext);
  const location = useLocation();
  const hasAccess = userData?.role === ROLE.ADMIN || (customer || userData?.role === customer);

  if (!hasAccess) {
    return <Navigate to={PageConfig.home} state={{from: location}} />;
  }

  return <Component />;
};

export default ProtectedRoute;
