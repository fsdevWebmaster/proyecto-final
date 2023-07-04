import { ComponentType } from 'react';

export interface IRoute {
  id: string;
  authRequired?: boolean;
  element: ComponentType;
  options?: any;
  name: string;
  path: string;
  metadata?: {
    title?: string;
  };
}
