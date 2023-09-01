import { lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from "react-router-dom";
import { Loader } from "@components";
import { Authorization } from '@components';

const Recovery = Loader(lazy(() => import('@components/LoginForm/RecoverPass')))
const Layout = Loader(lazy(() => import('../layouts/Main/MainLayout')));

// Auth

// Pages
const Login = Loader(lazy(() => import('@pages/Login/Login')))
const Profile = Loader(lazy(() => import('@pages/Profile/Profile')))
const Users = Loader(lazy(() => import('@pages/Users/Users')))
const Dashboard = Loader(lazy(() => import('@pages/Dashboard/Dashboard')))
const CreateUser = Loader(lazy(() => import('@pages/CreateUser/CreateUser')))
const DriverRegistration = Loader(lazy(() => import('@pages/Driver/DriverRegistration')))
const ContainerRegistration = Loader(lazy(() => import('@pages/Container/ContainerRegistration')))
const GoalDashboard = Loader(lazy(() => import('@pages/Goal/GoalDashboard')))
const AdminDashboard = Loader(lazy(() => import('@pages/Admin/AdminDashboard')))
const Goal = Loader(lazy(() => import('@pages/Goal/Goal')))

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
    path: 'recover-password',
    id: 'recover',
    element: <Recovery />
  },
  {
    path: 'dashboard',
    id: 'dashboard',
    element: <Authorization><Layout /></Authorization>,
    children: [
      {
        path: '',
        id: 'main',
        element: <Dashboard />
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
  }
];