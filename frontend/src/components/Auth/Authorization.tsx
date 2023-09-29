import React, { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { MxUserStore } from '@stores/UserStore';
import { MxLoginStore } from '@stores/LoginStore';

interface IAuthorization {
    children: ReactNode;
}

export const Authorization = ({children}: IAuthorization) => {
    const localToken = MxLoginStore.getAccessToken();

    if (!localToken) {
        return <Navigate replace to={'/login'} />
    }

    const userInfo = MxLoginStore.getUserInfoByToken(localToken!);

    if (userInfo && userInfo.exp * 1000 < Date.now() ) {
        MxLoginStore.logOut(userInfo.id);
        return <Navigate replace to={'/login'} />
    } else {
        MxUserStore.initProfile(userInfo.id);
        return children;
    }
}