import { ChangeEvent } from 'react';

import { ContainerModel, Driver } from '@models';

const mockContainers:ContainerModel[] = [
  { id: "1", containerNumber: "123", createdAt: new Date() },
  { id: "2", containerNumber: "234", createdAt: new Date() },
  { id: "3", containerNumber: "345", createdAt: new Date() }
]
const mockDrivers:Driver[] = [
  {
    name: 'Fidel',
    idDoc: "91",
    email: "fidel@mail.com",
    id: "1"
  },
  {
    name: 'Juan',
    idDoc: "92",
    email: "juan@mail.com",
    id: "2"
  }
]

