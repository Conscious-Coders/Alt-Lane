import React, {useEffect, useState }from 'react'
import Footer from '../Components/Footer'
import LandingNavBar from '../Components/LandingNavBar'
import {Redirect, Route} from 'react-router-dom';
import history from '../history'
import { render } from 'react-dom';
import { AuthContext } from "../App";
import axios from 'axios';


// must deleted exscries in one hour - backend needs to send message delete 


axios.defaults.withCredentials = 'true'
function Login () {
  const { dispatch } = React.useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [form, setForm] = React.useState(initialState);

  const handleChange  =  event =>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  // send token, id and usertype 
  const [token, setToken] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setForm({
      ...form,
      isSubmitting: true,
      errorMessage: null
    });
    try{
      const result = await fetch('http://localhost:9000/users/login', {
        method: 'POST',
        //withCredentials: 'true', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      }).then((res)=> res.json()).then(data =>{
        dispatch({
          type: "LOGIN",
          payload: data
        })
          setToken(data.token);  
      })
      
    }
    catch(error){
      setForm({
        ...form,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
    }
    
}

    if(token) {
      return <Redirect to='/homepage'/>
    }

  return (
    <div>
      <LandingNavBar/>
      <div className="container" style={{ marginTop:"5%",  marginBottom:"10%"}}>
        <img src='/alt_lane_black.png' style={{ width: '125px', marginBlock:"1%", height: 'auto' }} alt="alt-line logo"/>
        <div className='containter d-flex justify-content-center'>
          <div className='card w-50'>
            <div className='container card-body' >
              <form onSubmit={handleSubmit} style={{marginTop: '5%'}}>
                <div className='mb-3 row'>
                  <label htmlFor='email' className='col-sm-3 col-form-label text-start'>Email</label>
                  <div className='col-sm-8'>
                    <input className='form-control'            
                    value={form.email}
                    onChange={handleChange}
                    type='email'
                    id='email'
                    name='email' />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label htmlFor='password' className='col-sm-3 col-form-label text-start'>Password</label>
                  <div className='col-sm-8'>
                    <input className='form-control' 
                    value={form.password}
                    onChange={handleChange} 
                    type='password' 
                    id='password'
                    name='password' />
                  </div>
                </div>
                {form.errorMessage && (
                <span className="form-error">{form.errorMessage}</span>
                )}
                <button href='#' className='btn btn-dark' disabled={form.isSubmitting}>
                  {form.isSubmitting ? (
                    "Loading..."
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Login