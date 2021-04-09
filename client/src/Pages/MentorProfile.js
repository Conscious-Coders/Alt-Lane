import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import Form from '../Hooks/Form'
import Footer from "../Components/Footer"
import MentorNavBar from "../Components/MentorNavBar"


function MentorProfile (){
  const { form, handleChange } = Form({
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: '',
    company: '',
    linkedin: '',
    bio: ''
  })
  let careers =[
    { key: "Option 1", cat: "Group 1" },
    { key: "Option 2", cat: "Group 1" },
    { key: "Option 3", cat: "Group 1" },
    { key: "Option 4", cat: "Group 2" },
    { key: "Option 5", cat: "Group 2" },
    { key: "Option 6", cat: "Group 2" },
    { key: "Option 7", cat: "Group 2" }
  ];
  return(
    <div>
    <MentorNavBar/>
    <div className="container"  style={{ marginTop:"10%",  marginBottom:"10%"}}>
     
    <div className='containter d-flex justify-content-between'  style={{ marginTop:"1%"}}>
      <div className=" col-2" > 
        <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" class="rounded-circle" style={{ width: '200px', height: 'auto' }} alt=""/>
        <button className="btn btn-dark">edit profile picture</button>
      </div>
      <div className='card w-75 col-8'>
        <div className='card-body'>
          <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
            <button className="btn btn-dark ">Edit</button>
          </div>
       
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
              <label htmlFor='company' className='col-sm-2 col-form-label'>Company</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.company} onChange={handleChange} type='company' id='company' name='parentName' />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='linkedin' className='col-sm-2 col-form-label'>LinkedIn</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.linkedin} onChange={handleChange} type='linkedin' id='linkedin' name='parentEmail' />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='careerField' className='col-sm-2 col-form-label'>Career Field </label>
              <div className='col-sm-10'>
                <Multiselect
                options={careers}
                displayValue="key"
                selectionLimit="3"
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='bio' className='col-sm-2 col-form-label'>Bio</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.bio} onChange={handleChange} type='bio' id='bio' name='bio' />
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
export default MentorProfile