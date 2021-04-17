import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import Form from '../Hooks/Form'
import Footer from "../Components/Footer"
import LoginNav from "../Components/LoginedNavBar"
import { AuthContext } from "../App";


function Profile (){
  const { state: authState } = React.useContext(AuthContext);
  const careerChoice = React.useRef(null);
  const menteeCareer = React.useRef(null);
  const [interest, setMenteeInterests] = React.useState([])
  const [form, setForm] = React.useState({})


  function handleChange (event) {
    const name = event.target.name
    const value = event.target.value

    setForm({
      ...form,
      [name]: value
    })
    console.log("look here ->", name)
    console.log(value)
  }


  const getAllVals =()=>{
    const values = careerChoice.current.getSelectedItems();
    //form.careerField = values[0].id
    // values.forEach(val => form.careerFieldInterest.push(val.id))
    // console.log(form.careerFieldInterest)
  }

  const menteeInterests = ()=>{
    // const values = menteeCareer.current.getSelectedItems();
    // console.log("MENTEE", menteeCareer.current.getSelectedItems())
    //  values.forEach(val => form.careerFieldInterest.push(val.id))
    // console.log(form.careerFieldInterest)
  } 

  const [careers, setCareers] = React.useState([])
  let selectedValues= []

  React.useEffect(()=>{
    async function fetchCareers(){
      const fields = await fetch("http://localhost:9000/careers")
      const allCareers = await fields.json();
      let careers =[];
      allCareers.data.forEach(field =>{
        careers.push({key: field.name, id: field.id})
      })
      setCareers(careers)
    } 
    fetchCareers();

    async function fetchMentor(){

      const response = await fetch(`http://localhost:9000/${authState.userType}s/${authState.user}`,{ headers:{
        'Authorization': `Bearer ${authState.token}`
       }})
      console.log(response)
      const result = await response.json()
      console.log(result)

      setForm({ 
      firstName: result.data[0].first_name,
      lastName: result.data[0].last_name,
      email: result.data[0].email,
      photoUrl: result.data[0].photo_url,
      userType: result.data[0].email,
      careerField: result.data[0].career_field_id,
      parentName: result.data[0].parent_name,
      parentEmail: result.data[0].parent_email,
      bio: result.data[0].bio,
      company: result.data[0].company,
      linkedin: result.data[0].linkedin_url,
      careerFieldInterest: [],
    })
    
    }
    fetchMentor() 
    async function getMenteeInterests(){
      const response = await fetch(`http://localhost:9000/mentee_interests/interests_for_one_mentee`,{method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      },
      body: JSON.stringify({mentee_id: authState.user})
   })
      const result = await response.json();
      console.log(result)
      setMenteeInterests(result.data)
    }
    getMenteeInterests()
  }, [authState.user, authState.userType])

  careers.forEach(career =>{
    if(career.id === form.careerField ){
      selectedValues.push(career)
    }
  })
  interest.forEach(interest =>{
    careers.filter(career => {
      if(career.key === interest.name){
        selectedValues.push(career)
      }
    })
  })


  const [editBtn, setEditBtn] = React.useState(true);


  const btnClick = (event=>{
    if(editBtn===false){
      setEditBtn(true)

    }else{
      setEditBtn(false)
    }
  })


  const submitClick=(event=>{

  })

  return(
    <div>
    <LoginNav/>
    {authState.userType === "mentor"? (
    <div>
       <div className="container"  style={{ marginTop:"10%",  marginBottom:"10%"}}>
        
       <div className='containter d-flex justify-content-between'  style={{ marginTop:"1%"}}>
         <div className=" col-2" > 
           <img src={form.photoUrl} className="rounded-circle" style={{ width: '200px', height: '200px' }} alt=""/>
           <button className="btn btn-dark">edit profile picture</button>
         </div>
         <div className='card w-75 col-8'>
           <div className='card-body'>
             <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
             {editBtn === true? (
                  <button className="btn btn-dark " onClick={btnClick}>Edit</button>) 
              : (
                  <button className="btn btn-dark " onClick={btnClick}>Cancel</button>)}
             </div>
             <form>
               <div className='mb-3 row'>
                 <label htmlFor='firstName' className='col-sm-2 col-form-label'>First Name</label>
                 <div className='col-sm-10'>
                   <input className='form-control' value={form.firstName} onChange={handleChange} type='text' id='firstName' name='firstName' disabled={editBtn}/>
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='lastName' className='col-sm-2 col-form-label'>Last Name</label>
                 <div className='col-sm-10'>
                   <input className='form-control' value={form.lastName} onChange={handleChange} type='text' id='lastName' name='lastName' disabled={editBtn}/>
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                 <div className='col-sm-10'>
                   <input className='form-control' value={form.email} onChange={handleChange} type='email' id='email' name='email' disabled={editBtn} />
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='company' className='col-sm-2 col-form-label'>Company</label>
                 <div className='col-sm-10'>
                   <input className='form-control' value={form.company} onChange={handleChange} type='text' id='company' name='parentName' disabled={editBtn}/>
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='linkedin' className='col-sm-2 col-form-label'>LinkedIn</label>
                 <div className='col-sm-10'>
                   <input className='form-control' value={form.linkedin} onChange={handleChange} type='url' id='linkedin' name='parentEmail' disabled={editBtn}/>
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
                   <input className='form-control' value={form.bio} onChange={handleChange} type='text' id='bio' name='bio' disabled={editBtn} />
                 </div>
               </div>
             </form>
             {editBtn === true? ('') 
            : (
                <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
                  <button className="btn btn-dark " onClick={submitClick}>Submit</button>
                </div>
              )}
           </div>
         </div>
       </div>
       </div>
    </div>
      
    )
    : (<div>
    <div className="container"  style={{ marginTop:"10%",  marginBottom:"10%"}}>
     
    <div className='containter d-flex justify-content-between'  style={{ marginTop:"1%"}}>
      <div className=" col-2" > 
        <img src={form.photoUrl} className="rounded-circle" style={{ width: '200px', height: '200px' }} alt=""/>
        <button className="btn btn-dark">edit profile picture</button>
      </div>
      <div className='card w-75 col-8'>
        <div className='card-body'>
          <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
          {editBtn === true? (<button className="btn btn-dark " onClick={btnClick}>Edit</button>) 
          : (<button className="btn btn-dark " onClick={btnClick}>Cancel</button>)}
            
          </div>
       
          <form>
            <div className='mb-3 row'>
              <label htmlFor='firstName' className='col-sm-2 col-form-label'>First Name</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.firstName} onChange={handleChange} type='firstName' id='firstName' name='firstName' disabled={editBtn}/>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='lastName' className='col-sm-2 col-form-label'>Last Name</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.lastName} onChange={handleChange} type='lastName' id='lastName' name='lastName' disabled={editBtn} />
              </div>
            </div>
            
            <div className='mb-3 row'>
              <label htmlFor='parentName' className='col-sm-2 col-form-label'>Parent Name</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.parentName} onChange={handleChange} type='parentName' id='parentName' name='parentName' disabled={editBtn}/>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='parentEmail' className='col-sm-2 col-form-label'>Parent Email</label>
              <div className='col-sm-10'>
                <input className='form-control' value={form.parentEmail} onChange={handleChange} type='parentEmail' id='parentEmail' name='parentEmail' disabled={editBtn}/>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='careerFieldInterest' className='col-sm-2 col-form-label'>Career Field Interest</label>
              <div className='col-sm-10'>
                <Multiselect
                ref = {menteeCareer}
                onChange ={menteeInterests}
                options={careers}
                disablePreSelectedValues={editBtn}
                selectedValues={selectedValues}
                displayValue="key"
                selectionLimit="3"
                disable = {editBtn}
                />
                
              </div>
            </div>
          </form>
          {editBtn === true? ('') 
            : (
                <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
                  <button className="btn btn-dark " onClick={submitClick}>Submit</button>
                </div>
              )}
        </div>
      </div>
    </div>
    </div>
    </div>
    )}
    <Footer/>
  </div>
  )
}
export default Profile