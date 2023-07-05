import React, { ComponentType, Suspense } from 'react';
import { SuspenseLoader } from './SuspenseLoader';

export const Loader = (Component: ComponentType) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
