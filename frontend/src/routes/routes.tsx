import { lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from "react-router-dom";
import { Loader } from "@components";
import { Authorization } from '@components';

const Recovery = Loader(lazy(() => import('@components/LoginForm/RecoverPass')))
const Layout = Loader(lazy(() => import('@layouts/Main/MainLayout')));

// Auth

// Pages
const Login = Loader(lazy(() => import('@pages/Login/Login')))
const Profile = Loader(lazy(() => import('@pages/Profile/Profile')))
const Users = Loader(lazy(() => import('@pages/Users/Users')))
const Containers = Loader(lazy(() => import('@pages/Container/Containers')));
const Dashboard = Loader(lazy(() => import('@pages/Dashboard/Dashboard')))
const CreateUser = Loader(lazy(() => import('@pages/CreateUser/CreateUser')))
const DriverRegistration = Loader(lazy(() => import('@pages/Driver/DriverRegistration')))
const ContainerRegistration = Loader(lazy(() => import('@pages/Container/ContainerRegistration')))
const GoalDashboard = Loader(lazy(() => import('@pages/Goal/GoalDashboard')))
const AdminDashboard = Loader(lazy(() => import('@pages/Admin/AdminDashboard')))
const Goal = Loader(lazy(() => import('@pages/Goal/Goal')))


//docs
const Documantation = Loader(lazy(() => import('@pages/Doc/Documentation')));

// Status Pages
const Status404 = Loader(lazy(() => import('@pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('@pages/Status/Status500')));

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to="login" replace />
  },
  {
    path: 'login',
    id: 'login',
    element: <Login />
  },
  {
    path: '*',
    element: <Status404 />
  },
  {
    path: 'recover-password',
    id: 'recover',
    element: <Recovery />
  },
  {
    path: 'main',
    id: 'main',
    // element: <Authorization><Layout /></Authorization>,
    element: <Layout />,
    children: [
      {
        path: '',
        id: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'doc',
        id: 'doc',
        element: <Documantation />
      },
      {
        path: 'profile',
        id: 'profile',
        element: <Profile />
      },
      {
        path: 'users',
        id: 'users',
        element: <Users />
      },
      {
        path: 'containers',
        id: 'containers',
        element: <Containers />,
      },      
      {
        path: 'create-user',
        id: 'createuser',
        element: <CreateUser />
      },
      {
        path: 'container-registration',
        id: 'containerRegistration',
        element: <ContainerRegistration />
      },
      {
        path: 'driver-registration',
        id: 'driverRegistration',
        element: <DriverRegistration />
      },
      {
        path: 'goal-dashboard',
        id: 'goalDashboard',
        element: <GoalDashboard />
      },
      {
        path: 'goal',
        id: 'Goal',
        element: <Goal />
      },
      {
        path: 'admin-dashboard',
        id: 'adminDashboard',
        element: <AdminDashboard />
      }
    ]
  },
];