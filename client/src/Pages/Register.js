import React from 'react'
import { Link } from 'react-router-dom'
// import LandingNavBar from '../Components/LandingNavBar'
import Footer from "../Components/Footer"
import Form from '../Hooks/Form'

import MentorNavBar from "../Components/MentorNavBar"
function Register () {
  const { form, handleChange } = Form({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    photoUrl: '',
    parentName: '',
    parentEmail: ''
  })
  //coment
  return (
    <div>
      <MentorNavBar/>
      <div className="container"  style={{ marginTop:"10%",  marginBottom:"10%"}}>
        <img src='/alt_lane_black.png' style={{ width: '125px', height: 'auto' }} alt=""/>
      <div className='containter d-flex justify-content-center'  style={{ marginTop:"1%"}}>
        <div className='card w-75'>
          <div className='container card-body'>
            <h3 className='card-title'>Register</h3>
            <form>
              <div className='mb-3 row'>
                <label htmlFor='firstName' className='col-sm-2 col-form-label'>First Name</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.firstName} onChange={handleChange} type='firstName' id='firstName' name='firstName' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='lastName' className='col-sm-2 col-form-label'>Last Name</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.lastName} onChange={handleChange} type='lastName' id='lastName' name='lastName' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.email} onChange={handleChange} type='email' id='email' name='email' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.password} onChange={handleChange} type='password' id='password' name='password' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='photoUrl' className='col-sm-2 col-form-label'>Upload an image (use the photo Upload Api)</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.photoUrl} onChange={handleChange} type='photoUrl' id='photoUrl' name='photoUrl' />
                </div>
              </div>
            </form>
            <a href='#' className='btn btn-dark'>Register</a>
          </div>

        </div>

      </div>
      </div>
      <Footer/>
    </div>
  )
}
export default Register
