import { lazy } from 'react';
import { RouteObject } from 'react-router';
import { Loader } from "@components";
import { Authorization } from '@components';
import Gate from '@pages/Gate/Gate';
import { Check } from '@pages/Check/Check';
import { Scale } from '../pages/Scale/Scale';
import { Exit } from '@pages/Exit/Exit';
import { RoleAuth } from '@components/Auth/RoleAuth';

const Recovery = Loader(lazy(() => import('@components/LoginForm/RecoverPass')))
const Layout = Loader(lazy(() => import('@layouts/Main/MainLayout')));
const BasicLayout = Loader(lazy(() => import('@layouts/Basic/BasicLayout')));

// Auth

// Pages
const Login = Loader(lazy(() => import('@pages/Login/Login')))
const Profile = Loader(lazy(() => import('@pages/Profile/Profile')))
const Users = Loader(lazy(() => import('@pages/Users/Users')))
const Station = Loader(lazy(() => import('@pages/Station/Stations')))
const Containers = Loader(lazy(() => import('@pages/Container/Containers')));
const Dashboard = Loader(lazy(() => import('@pages/Dashboard/Dashboard')))
const CreateUser = Loader(lazy(() => import('@pages/CreateUser/CreateUser')))
const DriverRegistration = Loader(lazy(() => import('@pages/Driver/DriverRegistration')))
const DriverDashboard = Loader(lazy(() => import('@pages/Driver/DriverDashboard')))
const ContainerRegistration = Loader(lazy(() => import('@pages/Container/ContainerRegistration')))
const AdminDashboard = Loader(lazy(() => import('@pages/Admin/AdminDashboard')))
const AdminJourneysDashboard = Loader(lazy(() => import('@pages/Admin/AdminJourneysDashboard')))
const JourneyStatus = Loader(lazy(() => import('@pages/JourneyLog/JourneyLog')));
const Yard = Loader(lazy(() => import('@pages/Yard/Yard')));


//docs
const Documentation = Loader(lazy(() => import('@pages/Doc/Documentation')));

// Status Pages
const Status404 = Loader(lazy(() => import('@pages/Status/Status404')));

export const routes: RouteObject[] = [
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
    id: 'basic',
    element: <BasicLayout />,
    children: [
      {
        path: 'driver-dashboard',
        id: 'driverDashboard',
        element: <DriverDashboard />
      }
    ],
  },
  {
    path: 'recover-password',
    id: 'recover',
    element: <Recovery />
  },
  {
    id: 'app',
    element: <Authorization />,
    children: [
      {
        id: 'main',
        element: <Layout />,
        children: [
          {
            path: '',
            id: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'profile',
            id: 'profile',
            element: <Profile />
          },          
          {
            element: <RoleAuth allowedRoles={['ADMINISTRATOR']}/>,
            children: [
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
                path: 'update-user/:userId',
                id: 'updateuser',
                element: <CreateUser />
              },
              {
                path: 'doc',
                id: 'doc',
                element: <Documentation />
              },
              {
                path: 'admin-dashboard/:step',
                id: 'adminDashboard',
                element: <AdminDashboard />
              },
              {
                path: 'admin-journeys-dashboard',
                id: 'adminJourneysDashboard',
                element: <AdminJourneysDashboard />
              },
              {
                path: 'containers',
                id: 'containers',
                element: <Containers />,
              },
              {
                path: 'journey-status',
                id: 'journeyStatus',
                element: <JourneyStatus />
              }
            ],
          },
          {
            element: <RoleAuth allowedRoles={['EXIT', 'ADMINISTRATOR']}/>,
            children: [
              {
                path: 'exit',
                id: 'ExitPage',
                element: <Exit />
              },
            ],
          },          
          {
            element: <RoleAuth allowedRoles={['GATE', 'ADMINISTRATOR']}/>,
            children: [
              {
                path: 'gate',
                id: 'Gate',
                element: <Gate />
              },
              {
                path: 'driver-registry',
                id: 'driverRegistry',
                element: <DriverRegistration />
              },             
            ],
          },
          {
            element: <RoleAuth allowedRoles={['INSPECTOR', 'ADMINISTRATOR']}/>,
            children:[
              {
                path: 'container-registry',
                id: 'containerRegistry',
                element: <ContainerRegistration />
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
                path: 'check-two',
                id: 'CheckTwo',
                element: <Check />
              },
              {
                path: 'scale-one',
                id: 'Scale',
                element: <Scale />
              },
              {
                path: 'scale-two',
                id: 'Scale',
                element: <Scale />
              },
            ],
          },
        ],
      }
    ],
  },
];