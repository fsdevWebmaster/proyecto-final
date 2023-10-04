import { lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from "react-router-dom";
import { Loader } from "@components";
import { Authorization } from '@components';
import { Yard } from '@pages/Yard/Yard';
import Gate from '@pages/Gate/Gate';
import { Check } from '@pages/Check/Check';
import { Scale } from '../pages/Scale/Scale';
import { Exit } from '@pages/Exit/Exit';

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
const DriverDashboard = Loader(lazy(() => import('@pages/Driver/DriverDashboard')))
const ContainerRegistration = Loader(lazy(() => import('@pages/Container/ContainerRegistration')))
const GoalDashboard = Loader(lazy(() => import('@pages/Gate/GoalDashboard')))
const AdminDashboard = Loader(lazy(() => import('@pages/Admin/AdminDashboard')))
const AdminJourneysDashboard = Loader(lazy(() => import('@pages/Admin/AdminJourneysDashboard')))


//docs
const Documentation = Loader(lazy(() => import('@pages/Doc/Documentation')));

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
    element: <Authorization><Layout /></Authorization>,
    children: [
      {
        path: '',
        id: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'doc',
        id: 'doc',
        element: <Documentation />
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
        path: 'container-registry',
        id: 'containerRegistry',
        element: <ContainerRegistration />
      },
      {
        path: 'driver-registry',
        id: 'driverRegistry',
        element: <DriverRegistration />
      },
      {
        path: 'driver-dashboard',
        id: 'driverDashboard',
        element: <DriverDashboard />
      },
      {
        path: 'goal-dashboard',
        id: 'goalDashboard',
        element: <GoalDashboard />
      },
      {
        path: 'gate',
        id: 'Gate',
        element: <Gate />
      },
      {
        path: 'yard',
        id: 'Yard',
        element: <Yard />
      },
      {
        path: 'check-one',
        id: 'CheckOne',
        element: <Check />
      },
      {
        path: 'scale',
        id: 'Scale',
        element: <Scale />
      },
      {
        path: 'exit',
        id: 'ExitPage',
        element: <Exit />
      },
      {
        path: 'admin-dashboard',
        id: 'adminDashboard',
        element: <AdminDashboard />
      },
      {
        path: 'admin-journeys-dashboard',
        id: 'adminJourneysDashboard',
        element: <AdminJourneysDashboard />
      }
    ]
  },
];