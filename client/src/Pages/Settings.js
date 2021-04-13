import React from 'react'
import Form from '../Hooks/Form'
import Footer from "../Components/Footer"
import MentorNavBar from "../Components/MentorNavBar"
import MenteeNavBar from "../Components/MenteeNavBar"

function Settings (props){
  const { form, handleChange } = Form({
    email: '',
    oldPassword: '',
    newPassword: '', 
  })

  const isMentor = props.isMentor; 

  return(
    <div>

    {isMentor ? <MentorNavBar/> : <MenteeNavBar/>}


    <div className="container"  style={{ marginTop:"10%",  marginBottom:"10%"}}>
     
    <div className='containter d-flex justify-content-center'  style={{ marginTop:"1%"}}>
    
      <div className='card w-75 col-8'>
        <div className='card-body'>
          <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
            <button className="btn btn-dark ">Edit</button>
          </div>
       
          <form>
            <div className='mb-3 row'>
              <label htmlFor='firstName' className='col-sm-2 col-form-label'>Email</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.email} onChange={handleChange} type='email' id='email' name='email' />
              </div>
            </div>
            
            <div className='mb-3 row'>
              <label htmlFor='password' className='col-sm-2 col-form-label'>Old Password</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.oldPassword} onChange={handleChange} type='password' id='oldPassword' name='oldPassword' />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='password' className='col-sm-2 col-form-label'>New Password</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.newPassword} onChange={handleChange} type='password' id='newPassword' name='newPassword' />
              </div>
            </div>
          </form>
        </div>

      </div>

    </div>
    </div>
    <Footer/>
  </div>
  )
}
export default Settings