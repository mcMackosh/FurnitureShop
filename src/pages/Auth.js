import React, { useContext, useState } from 'react';
import "./css/CSSforAuth.css"
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { registration } from '../http/userAPI';
import { login } from '../http/userAPI';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';




const Auth = observer(() =>
{
  const location = useLocation()
  const navigate = useNavigate();
  const isRegistration = location.pathname === '/registration'
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginInput, setLoginInput] = useState('')

  const {user} = useContext(Context)
 

  const buttonClick = async () =>
  {
    try {
      let userData
      if(isRegistration)
      {
        userData = await registration(emailInput,loginInput,passwordInput)
        alert('We need verify your mail. Email us a link?')
        console.log(userData)
      }
      else{
        userData = await login(emailInput,passwordInput)
        console.log(userData) 
        user.setIsAuth(true)
        navigate('/choise-category')
      }
      user.setUser(userData)
    } 
    catch (e) {
       
      alert(e.response.data.message)
    }
  }
  
  return (

    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{isRegistration ? 'Sing in' : 'Log in'}</h3>
          <div className="form-group mt-3">
            {isRegistration ?
              <div>
                <label>Login</label>
                <input value={loginInput} onChange={e => setLoginInput(e.target.value)} type="login" className="form-control mt-1"
                 placeholder="Enter login"/>
              </div> : <div></div>
            }
            <div className="form-group mt-3"></div>
            <label>Email</label>
            <input
              value={emailInput} onChange={e => setEmailInput(e.target.value)}
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="dark" 
              onClick={buttonClick}
              >
                Next
            </Button>
          </div>
          
          <p className="forgot-password text-right mt-4">
          {isRegistration ? <Nav.Link  href="/login">Already have an account</Nav.Link> : <Nav.Link  href="/registration">No account</Nav.Link>}
          </p>
        </div>
      </form>
    </div>
  )
}
)

export default Auth