import React from 'react'
import { Link } from 'react-router-dom'
import LandingNavBar from '../Components/LandingNavBar'
import Footer from "../Components/Footer"
import Form from '../Hooks/Form'
import { Multiselect } from 'multiselect-react-dropdown';


function Register () {
  const { form, handleChange } = Form({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    photoUrl: '',
    parentName: '',
    parentEmail: '',
    careerFieldInterest: '',
    company: "",
    linkedin: "",
  })
  
  const handleMentee = (e)=>{
    e.preventDefault();
    let mentor= document.getElementById("mentor-form")
    let menteee = document.getElementById("mentee-form")
    mentor.style.display ="none"
    mentor.removeAttribute("class")
    menteee.setAttribute("class", "active")
    menteee.style.display ="block"
  }
  const handleMentor = (e)=>{
    e.preventDefault();
    let mentor = document.getElementById("mentor-form")
    let mentee = document.getElementById("mentee-form")
    mentee.style.display ="none"
    mentee.removeAttribute("active")
    mentor.setAttribute("class", "active")
    mentor.style.display ="block"

  }

  let careers =[
    { key: "Option 1", cat: "Group 1" },
    { key: "Option 2", cat: "Group 1" },
    { key: "Option 3", cat: "Group 1" },
    { key: "Option 4", cat: "Group 2" },
    { key: "Option 5", cat: "Group 2" },
    { key: "Option 6", cat: "Group 2" },
    { key: "Option 7", cat: "Group 2" }
  ];
  
  return (
    <div>
      <LandingNavBar/>
      <div className="container"  style={{ marginTop:"5%",  marginBottom:"10%"}}>
        <img src='/alt_lane_black.png' style={{ width: '125px', height: 'auto' }} alt=""/>
        
      <div className='containter d-flex justify-content-center'  style={{ marginTop:"1%"}}>
        <div className='card w-75' >
        <div className="panel-heading">
						<div className="d-flex justify-content-around ">
							<div className="col-xs-6 fs-3 nav-item">
								<a href="#" className="active nav-link link-dark" id="mentee-form-link" onClick={handleMentee}>Mentee Register</a>
							</div>
							<div className="col-xs-6 fs-3 nav-item">
								<a href="#" className="nav-link link-secondary" id="mentor-form-link" onClick={handleMentor}>Mentor Register</a>
							</div>
						</div>
            <hr/>
					</div>
          <div className='container card-body'>
            <form id="mentee-form" style={{display:"block"}}  >
              <div className='mb-3 row'>
                <label htmlFor='firstName' className='col-sm-2 col-form-label' >First Name</label>
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
                <label htmlFor='photoUrl' className='col-sm-2 col-form-label'>Upload an image </label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.photoUrl} onChange={handleChange} type='photoUrl' id='photoUrl' name='photoUrl' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='parentName' className='col-sm-2 col-form-label'>Parent Name</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.parentName} onChange={handleChange} type='parentName' id='parentName' name='parentName' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='parentEmail' className='col-sm-2 col-form-label'>Parent Email</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.parentEmail} onChange={handleChange} type='parentEmail' id='parentEmail' name='parentEmail' />
                </div>
              </div>
              <div className='mb-3 row'>
              <label htmlFor='careerField' className='col-sm-2 col-form-label'>Career Field Interest </label>
              <div className='col-sm-10'>
                <Multiselect
                options={careers}
                displayValue="key"
                selectionLimit="3"
                />
              </div>
            </div>
              <button href='#' className='btn btn-dark'>Register</button>
            </form>
            <form id="mentor-form" style={{display:"none"}} >
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
                <label htmlFor='company' className='col-sm-2 col-form-label'>Company</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.company} onChange={handleChange} type='company' id='company' name='company' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='linkedin' className='col-sm-2 col-form-label'>LinkedIn</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.linkedin} onChange={handleChange} type='linkedin' id='linkedin' name='linkedin' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='bio' className='col-sm-2 col-form-label'>Bio</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.bio} onChange={handleChange} type='bio' id='bio' name='bio' />
                </div>
              </div>
              <div className='mb-3 row'>
              <label htmlFor='careerField' className='col-sm-2 col-form-label'>Career Field Interest </label>
              <div className='col-sm-10'>
                <Multiselect
                options={careers}
                displayValue="key"
                selectionLimit="3"
                />
              </div>
            </div>
              <div className='mb-3 row'>
                <label htmlFor='photoUrl' className='col-sm-2 col-form-label'>Upload an image</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.photoUrl} onChange={handleChange} type='photoUrl' id='photoUrl' name='photoUrl' />
                </div>
              </div>
              
              <button href='#' className='btn btn-dark'>Register</button>
            </form>
          </div>

        </div>

      </div>
      </div>
      <Footer/>
    </div>
  )
}
export default Register
