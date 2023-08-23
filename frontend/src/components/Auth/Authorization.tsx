import React, { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { MxUserStore } from '@stores/UserStore';
import { MxLoginStore } from '@stores/LoginStore';

interface IAuthorization {
    children: ReactNode;
}

export const Authorization = ({children}: IAuthorization) => {
    const { user } = MxUserStore;
    const { auth } = MxLoginStore;

    if (!auth.isAuthenticated || !user) {
        return <Navigate to={'/login'} />
    }

    return children;
}