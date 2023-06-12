import React, { useContext } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routesData/RoutesList'
import {observer} from "mobx-react-lite";

const NavRoutes = observer(() =>
{
    const {user} = useContext(Context)
    
    return (
    <Routes>
      {user._isAuth && authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      <Route path='*' element={<Navigate to={'/choise-category'}/>} />
    </Routes>
    )
});

export default NavRoutes