import React, {useEffect, useState }from 'react'
import Footer from '../Components/Footer'
import LandingNavBar from '../Components/LandingNavBar'
import Form from '../Hooks/Form'
import {Redirect, Route} from 'react-router-dom';
import history from '../history'

function Login () {
  const { form, handleChange } = Form({
    email: '',
    password: ''
  })

  const handleSubmit = async e => {
    e.preventDefault();
    

    const result = await (await fetch('http://localhost:9000/users/login', {
      method: 'POST',
      withCredentials: 'true', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })).json();
    console.log(result);
    if(result.token) {
      console.log("inside the token if statment")
      return ( history.push('/homepage') )
      }
}


  return (
    <div>
      <LandingNavBar/>
      <img src='/alt_lane_black.png' style={{ width: '125px', height: 'auto' }} alt="alt-line logo"/>
      <div className='containter d-flex justify-content-center'>
        <div className='card w-50'>
          <div className='container card-body'>
            <h3 className='card-title'>Login</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3 row'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                <div className='col-sm-10'>
                  <input className='form-control'            
                  value={form.email}
                  onChange={handleChange}
                  type='email'
                  id='email'
                  name='email' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                <div className='col-sm-10'>
                  <input className='form-control' 
                  value={form.password}
                  onChange={handleChange} 
                  type='password' 
                  id='password'
                  name='password' />
                </div>
              </div>
              <button href='#' className='btn btn-dark'>LOGIN</button>
            </form>
          </div>

        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Login