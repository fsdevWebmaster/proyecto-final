import React, { lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from "react-router-dom";
import { Loader } from "@components";

const Login = Loader(lazy(() => import('@pages/Login/Login')))
const Recovery = Loader(lazy(() => import('@components/LoginForm/RecoverPass')))
const Layout = Loader(lazy(() => import('../layouts/Main/MainLayout')));

// Pages
const Profile = Loader(lazy(() => import('@pages/Profile/Profile')))
const Users = Loader(lazy(() => import('@pages/Users/Users')))
const Dashboard = Loader(lazy(() => import('@pages/Dashboard/Dashboard')))

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
    element: <Layout />,
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
      }      
    ]
  }
];