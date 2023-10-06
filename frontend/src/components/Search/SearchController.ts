import { ChangeEvent } from 'react';

import { ContainerModel, Driver } from '@models';

const mockContainers:ContainerModel[] = [
  { id: "1", containerNumber: "123" },
  { id: "2", containerNumber: "234" },
  { id: "3", containerNumber: "345" }
]
const mockDrivers:Driver[] = [
  {
    name: 'Fidel',
    idDoc: "91",
    email: "fidel@mail.com"
  },
  {
    name: 'Juan',
    idDoc: "92",
    email: "juan@mail.com"
  }
]

