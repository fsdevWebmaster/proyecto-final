import { JourneyModel } from "@models/Journey/Journey";
import { StepModel } from "@models/Step/Step";

export type Status = 'error' | 'warning' | 'success' | 'secondary';

export type PagesStatus = {
  path: string;
  name: string;
  title: string;
  svgPath: string;
  visible: boolean;
};

export type Station = {
  step: StepModel,
  journeys?: JourneyModel[],
}

export const appPages: PagesStatus[] = [
  {
    path: 'users',
    name: 'Manage Users',
    title: 'Check the users and create a new user',
    svgPath: '/static/images/illustrations/users-user-svgrepo-com.svg',
    visible: false,
  },

  {
    path: 'admin-journeys-dashboard',
    name: 'Manage Journey',
    title: 'Check how many containers are availables for stations and see their journey statuses',
    svgPath: '/static/images/illustrations/journey-svgrepo-com.svg',
    visible: false,
  },
  {
    path: 'containers',
    name: 'Manage Containers',
    title: 'Check Containers and register new container',
    svgPath: '/static/images/illustrations/container-svgrepo-com.svg',
    visible: false,
  },

  {
    path: 'driver-registry',
    name: 'Driver Registration',
    title: 'Add a new Driver',
    svgPath: '/static/images/illustrations/driver-card-svgrepo-com.svg',
    visible: false,
  },
  {
    path: 'gate',
    name: 'Gate Station',
    title: 'First Station to Initialize the Container Journey',
    svgPath: '/static/images/illustrations/gate-svgrepo-com.svg',
    visible: false,
  },

  {
    path: 'yard',
    name: 'On Hold Station',
    title: 'Container will stay here for a while',
    svgPath: '/static/images/illustrations/onHold-svgrepo-com.svg',
    visible: false,
  },
  {
    path: 'scale-one',
    name: 'Scale One',
    title: 'Set first container weight',
    svgPath: '/static/images/illustrations/scale-one-svgrepo-com.svg',
    visible: false,
  },      
  {
    path: 'check-one',
    name: 'Check Container One',
    title: 'Verify first Container Status',
    svgPath: '/static/images/illustrations/check-one-svgrepo-com.svg',
    visible: false,
  },
  {
    path: 'check-two',
    name: 'Check Container Two',
    title: 'Verify Container Status last time',
    svgPath: '/static/images/illustrations/check-two-svgrepo-com.svg',
    visible: false,
  },
  {
    path: 'scale-two',
    name: 'Scale Two',
    title: 'Set second container weight',
    svgPath: '/static/images/illustrations/scale-two-svgrepo-com.svg',
    visible: false,
  },
  {
    path: 'exit',
    name: 'Exit Station',
    title: 'Finish a journey',
    svgPath: '/static/images/illustrations/exit-svgrepo-com.svg',
    visible: false,
  },   
];