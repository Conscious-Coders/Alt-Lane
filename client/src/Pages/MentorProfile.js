import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import Form from '../Hooks/Form'
import Footer from "../Components/Footer"
import MentorNavBar from "../Components/MentorNavBar"
import { AuthContext } from "../App";


function MentorProfile (){
  const { state: authState } = React.useContext(AuthContext);
  const [thing, setThing] = React.useState(0)
  const careerChoice = React.useRef(null);
  const [form, setForm] = React.useState({})
  const { formed, handleChange } = Form({
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

  const getAllVals =()=>{
    const values = careerChoice.current.getSelectedItems();
    form.careerField = values[0].id
    // values.forEach(val => form.careerFieldInterest.push(val.id))
    // console.log(form.careerFieldInterest)
  }


  let careers =[];
 
  React.useEffect(()=>{
    async function fetchCareers(){
      const fields = await fetch("http://localhost:9000/careers")
      const allCareers = await fields.json();
      allCareers.data.forEach(field =>{
        careers.push({key: field.name, id: field.id})
      })
    } 
    fetchCareers();
    async function fetchMentor(){
      console.log(authState)
      const response = await fetch(`http://localhost:9000/mentors/${authState.user}`)
      console.log(response)
      const result = await response.json()
      setForm({ 
      firstName: result.data[0].first_name,
      lastName: result.data[0].last_name,
      email: result.data[0].email,
      photoUrl: result.data[0].photo_url,
      userType: result.data[0].email,
      careerField: result.data[0].career_field_id,
      bio: result.data[0].bio,
      company: result.data[0].company,
      linkedin: result.data[0].linkedin_url,
    })
    console.log(form)
      console.log("This is what is returned",result.data[0])
    }
    fetchMentor() 

   
  }, [authState.user])
  let selectedValues= [{key:form.careerField}]

  return(
    <div>
    <MentorNavBar/>
    <div className="container"  style={{ marginTop:"10%",  marginBottom:"10%"}}>
     
    <div className='containter d-flex justify-content-between'  style={{ marginTop:"1%"}}>
      <div className=" col-2" > 
        <img src={form.photoUrl} className="rounded-circle" style={{ width: '200px', height: '200px' }} alt=""/>
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
                <input className='form-control' value={form.firstName} onChange={handleChange} type='text' id='firstName' name='firstName' disabled/>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='lastName' className='col-sm-2 col-form-label'>Last Name</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.lastName} onChange={handleChange} type='text' id='lastName' name='lastName' disabled/>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.email} onChange={handleChange} type='email' id='email' name='email' disabled />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='company' className='col-sm-2 col-form-label'>Company</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.company} onChange={handleChange} type='text' id='company' name='parentName' disabled/>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='linkedin' className='col-sm-2 col-form-label'>LinkedIn</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.linkedin} onChange={handleChange} type='url' id='linkedin' name='parentEmail' disabled/>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='careerField' className='col-sm-2 col-form-label'>Career Field </label>
              <div className='col-sm-10'>
                <Multiselect
                 ref = {careerChoice}
                 onChange = {getAllVals}
                options={careers}
                disablePreSelectedValues={true}
                selectedValues={selectedValues}
                displayValue="key"
                selectionLimit="1"
                disable = {true}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='bio' className='col-sm-2 col-form-label'>Bio</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.bio} onChange={handleChange} type='text' id='bio' name='bio' disabled />
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