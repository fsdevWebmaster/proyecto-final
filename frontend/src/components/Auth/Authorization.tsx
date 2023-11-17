import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { MxUserStore, MxLoginStore } from '@stores';

export const Authorization = () => {
    const localToken = MxLoginStore.getAccessToken();
    if (!localToken) {
        return <Navigate replace to={'/login'} />
    }

    const userInfo = MxLoginStore.getUserInfoByToken(localToken!);

    try {
        if (userInfo && userInfo.exp * 1000 < Date.now() ) {
            MxLoginStore.logOut(userInfo.id);
            return <Navigate replace to={'/login'} />
        } else {
            MxLoginStore.setSession(localToken, true);
            MxUserStore.initProfile(userInfo.id);

            return <Outlet />;
        }   
    } catch (error) {
        return <Navigate replace to={'/login'} />
    }
}