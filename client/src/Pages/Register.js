import React from 'react'
import {Redirect} from 'react-router-dom'
import LandingNavBar from '../Components/LandingNavBar'
import Footer from "../Components/Footer"
import Form from '../Hooks/Form'
import { Multiselect } from 'multiselect-react-dropdown';


function Register () {
  const [registered, setRegistered ] = React.useState(null)
  const [photo, setPhoto] = React.useState([])
  const fileSelect = React.useRef(null);
  const careerChoice = React.useRef(null);
  const menteeCareer = React.useRef(null);
  const { form, handleChange } = Form({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    photoUrl: '',
    userType: '',
    parentName: '',
    parentEmail: '',
    careerField: '',
    bio: '',
    careerFieldInterest: [],
    company: "",
    linkedin: "",
  })
  
  const handleMentee = (e)=>{
    e.preventDefault();
    let mentor= document.getElementById("mentor")
    let menteee = document.getElementById("mentee")
    mentor.style.display ="none"
    mentor.removeAttribute("class")
    menteee.setAttribute("class", "active")
    menteee.style.display ="block"
  }
  const handleMentor = (e)=>{
    e.preventDefault();
    let mentor = document.getElementById("mentor")
    let mentee = document.getElementById("mentee")
    mentee.style.display ="none"
    mentee.removeAttribute("active")
    mentor.setAttribute("class", "active")
    mentor.style.display ="block"

  }
 const [careers, setCareers] = React.useState([])
  React.useEffect(()=>{
    async function getCareers(){
      const fields = await fetch("http://localhost:9000/careers")
      const allCareers = await fields.json();
      let careers =[];
      allCareers.data.forEach(field =>{
        careers.push({key: field.name, id: field.id})
      })
      setCareers(careers)
    }
    getCareers()
   
  },[])
  
  const uploadFile = (e)=>{
    let photo = e.target.files[0];
    if(photo){
      setPhoto(photo)
    }
  }

  const unsignedPreset = "lsaabzji";
  const formData = new FormData();
  formData.append('file', photo);
  formData.append('upload_preset', unsignedPreset);

  const getAllVals =()=>{
    const values = careerChoice.current.getSelectedItems();
    form.careerField = values[0].id
   
  }
  const menteeInterests = ()=>{
    const values = menteeCareer.current.getSelectedItems();
    console.log("MENTEE", menteeCareer.current.getSelectedItems())
     values.forEach(val => form.careerFieldInterest.push(val.id))
    console.log(form.careerFieldInterest)
  } 
  

  const handleSubmit= async (e )=>{
    e.preventDefault();
    form.userType = e.target.id
    if(form.userType === "mentee"){
      menteeInterests()
    }else{
      getAllVals()
    }

    try{   //sending user images to cloudinary to then store a image url in the db
      const response = await fetch("https://api.cloudinary.com/v1_1/alt-lane/image/upload", {
        method: 'POST',
        body: formData
     })
     const result = await response.json()
     form.photoUrl = result.secure_url
    }
    catch(err){console.log(err)}

    try{
      const postUser =await fetch("http://localhost:9000/users",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: form.firstName, 
          last_name: form.lastName, 
          email: form.email, 
          password: form.password, 
          photo_url: form.photoUrl, 
          user_type: form.userType
        })
      })
      
      const id = await fetch("http://localhost:9000/users")
     
      const getId = await id.json();
      console.log(getId)
      const current = await getId.data.filter(ele => ele.email === form.email)
      console.log(current)
      form.id = current[0].user_id
      setRegistered(true)
    
      const url = `http://localhost:9000/${form.userType}s`
      let data = {};
      if(form.userType === "mentee"){
        data ={mentee_id: form.id, parent_name: form.parentName, parent_email: form.parentEmail}
      }else{
        data = {mentor_id: form.id, bio: form.bio, career_field_id: form.careerField, company: form.company, linkedin_url: form.linkedin}
      }
      const menteeMentorPost = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log(menteeMentorPost)
      await menteeMentorPost.json()
      console.log(form)
      if(form.userType === "mentee"){
        const menteeMentorPost = await fetch("http://localhost:9000/mentee_interests",{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mentee_id: form.id,
            career_field_array: form.careerFieldInterest
          })
        })
      }
     
    }
    catch(err){
      console.log(err)
    }
      
  }
  if(registered){
    console.log(registered)
    return(<Redirect to="/login"/>)
  }

  
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
            <form onSubmit={handleSubmit} id="mentee" style={{display:"block"}}  >
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
                  <input className='form-control' ref={fileSelect} onChange={uploadFile} type='file' id='photoUrl' name='photoUrl' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='parentName' className='col-sm-2 col-form-label'>Parent Name</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.parentName} onChange={handleChange} type='text' id='parentName' name='parentName' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='parentEmail' className='col-sm-2 col-form-label'>Parent Email</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.parentEmail} onChange={handleChange} type='email' id='parentEmail' name='parentEmail' />
                </div>
              </div>
              <div className='mb-3 row'>
              <label htmlFor='careerField' className='col-sm-2 col-form-label'>Career Field Interest </label>
              <div className='col-sm-10'>
              <Multiselect id="careers"
                ref = {menteeCareer}
                onChange ={menteeInterests}
                options={careers}
                displayValue="key"
                selectionLimit="3"
                />
              </div>
            </div>
              <button href='#' className='btn btn-dark'>Register</button>
            </form>
            <form onSubmit={handleSubmit} id="mentor" style={{display:"none"}} >
              <div className='mb-3 row'>
                <label htmlFor='firstName' className='col-sm-2 col-form-label'>First Name</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.firstName} onChange={handleChange} type='text' id='firstName' name='firstName' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='lastName' className='col-sm-2 col-form-label'>Last Name</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.lastName} onChange={handleChange} type='text' id='lastName' name='lastName' />
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
                  <input className='form-control' value={form.company} onChange={handleChange} type='text' id='company' name='company' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='linkedin' className='col-sm-2 col-form-label'>LinkedIn</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.linkedin} onChange={handleChange} type='url' id='linkedin' name='linkedin' />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor='bio' className='col-sm-2 col-form-label'>Bio</label>
                <div className='col-sm-10'>
                  <input className='form-control' value={form.bio} onChange={handleChange} type='text' id='bio' name='bio' />
                </div>
              </div>
              <div className='mb-3 row'>
              <label htmlFor='careerField' className='col-sm-2 col-form-label'>Career Field Interest </label>
              <div className='col-sm-10'>
                <Multiselect id="careers"
                ref = {careerChoice}
                onChange ={getAllVals}
                options={careers}
                displayValue="key"
                selectionLimit="1"
                />
              </div>
            </div>
              <div className='mb-3 row'>
                <label htmlFor='photoUrl'  className='col-sm-2 col-form-label'>Upload an image</label>
                <div className='col-sm-10'>
                  <input className='form-control' ref={fileSelect} onChange={uploadFile} type='file'  id='photoUrl' name='photoUrl' />
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
