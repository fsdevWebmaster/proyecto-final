export type Status = 'error' | 'warning' | 'success' | 'secondary';

export type PagesStatus = {
  path: string;
  name: string;
  title: string;
  svgPath: string;
  visible: boolean;
};

export const appPages: PagesStatus[] = [
  {
    path: 'users',
    name: 'List Users',
    title: 'Manage the users',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'create-user',
    name: 'Create Users',
    title: 'Create an User',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'admin-dashboard',
    name: 'Administration Panel',
    title: 'Manage daily your work',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'admin-journeys-dashboard',
    name: 'Journey Panel',
    title: 'Check how the journeys goes',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'containers',
    name: 'List Containers',
    title: 'Manage Containers registered',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'journey-status',
    name: 'Journey Details',
    title: 'See logs of a the journey',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'exit',
    name: 'Last Step',
    title: 'Finish a journey',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'gate',
    name: 'Initialize Journey',
    title: 'Initialize the Container Journey',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'driver-registry',
    name: 'Manage Drivers',
    title: 'Add a new Driver',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'container-registry',
    name: 'Manage Containers',
    title: 'Add a new Container',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'yard',
    name: 'On Hold Station',
    title: 'Container will stay here for a while',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'check-one',
    name: 'Verify first Container Status',
    title: 'Verify first Container Status',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'check-two',
    name: 'Check Container',
    title: 'Verify Container Status last time',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },
  {
    path: 'scale-one',
    name: 'Verify Scale for the first time',
    title: 'Verify Scale for the first time',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },      
  {
    path: 'scale-two',
    name: 'Verify Scale for the first time',
    title: 'Verify Scale Status last time',
    svgPath: '/static/images/illustrations/handshake.svg',
    visible: false,
  },      
];