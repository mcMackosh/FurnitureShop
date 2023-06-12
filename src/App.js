import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import {check} from "./http/userAPI";
import {GetAllteam} from "./http/shopBase";

import { Context } from '../src/index';
import NavBar from './components/Navbar';
import Footer from './components/footer';
import NavRoutes from './components/NavRoutes';
import { Spinner } from 'react-bootstrap';


let App = observer(() => {
  const [loading, setLoading] = useState(false)
  const { user } = useContext(Context)

  useEffect(() => {
    // GetAllteam()
    try
    {
      if (localStorage.getItem('token')) {
        
        check().then(data => {
          if (data.setIsAuth == true) {
            
            user.setUser(data)
            user.setIsAuth(true)
          }
        }).catch(
        (err) => localStorage.removeItem('token'),
        user.setUser({}),
        user.setIsAuth(false)
        ).finally(() => setLoading(false))
      }
    }
    catch(e){
      alert(e.response.data.message)
    }
    
  },[])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <NavRoutes/>
      <Footer/>
    </BrowserRouter>
  );
}
)


export default App;
