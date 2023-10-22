import { MxUserStore } from '@stores';
import {useLocation, Outlet, Navigate } from 'react-router-dom';

interface IAllowedRoles {
  allowedRoles: string[];
}

export const RoleAuth = ({ allowedRoles}: IAllowedRoles) => {
  const location = useLocation();
  const { user } = MxUserStore;

  return user?.roles.find(role => allowedRoles.includes(role.role)) ? <Outlet /> : <Navigate to="/" state={{ from: location}} replace />
}