import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
//import Form from '../Hooks/Form'
import Footer from "../Components/Footer"
import LoginNav from "../Components/LoginedNavBar"
import { AuthContext } from "../App";
//import {Redirect, Route} from 'react-router-dom';


function Profile (){
  const { state: authState } = React.useContext(AuthContext);
  const careerChoice = React.useRef(null);
  const menteeCareer = React.useRef(null);
  const [interest, setMenteeInterests] = React.useState([])
  const [form, setForm] = React.useState({})
  const [editBtn, setEditBtn] = React.useState(true);


  // function handleChange (event) {
  //   const name = event.target.name
  //   const value = event.target.value

  //   setForm({
  //     ...form,
  //     [name]: value
  //   })
  // }


  const getAllVals =()=>{
    //const values = careerChoice.current.getSelectedItems();
    //form.careerField = values[0].id
    // values.forEach(val => form.careerFieldInterest.push(val.id))
    // console.log(form.careerFieldInterest)
  }

  const menteeInterests = ()=>{
    //const values = menteeCareer.current.getSelectedItems();
    //console.log("MENTEE", menteeCareer.current.getSelectedItems())
     //values.forEach(val => form.careerFieldInterest.push(val.id))
    //console.log(values)
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
      const result = await response.json()

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

 
  //Edit button that allows users to edit their profile information
  const btnClick = (event=>{
    if(editBtn===false){
      setEditBtn(true)

    }else{
      setEditBtn(false)
    }
  })
  

  //First submit button
  //Checks if fields first name and last name have been changed
  //If so, add the new information to the database
  const submitClick=( async event=>{
    setEditBtn(true)
    let changed = false;

    if(document.getElementById('firstName').value !== form.firstName && document.getElementById('firstName').value !== ''){
      var fName = document.getElementById('firstName').value
      changed = true;
    }

    if(document.getElementById('lastName').value !== form.lastName && document.getElementById('lastName').value !== ''){
      var lName = document.getElementById('lastName').value
      changed = true;
    }


    //If any user changes their first and/or last name
    if(changed === true){
      try{
        const response = await fetch('http://localhost:9000/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.token}`
          },
          body: JSON.stringify({
            user_id : authState.user,
            first_name : fName,
            last_name : lName,
          }),
        })
        return response.json();   
      }
      catch(err){
        console.log(err)
      }
    }
  })



  //Second submit button
  //Checks if fields bio, company and linkedin url have been changed
  //If so, add the new information to the database
  const submitClickPart2=( async event=>{
    
    let changedMentor = false;
    let changedMentee = false;

      //If the user Logged in is a mentor
    if(authState.userType === "mentor"){
      if(document.getElementById('company').value !== form.company && document.getElementById('company').value !== ''){
        var comp = document.getElementById('company').value
        changedMentor = true;
      }

     if(document.getElementById('linkedin').value !== form.linkedin && document.getElementById('linkedin').value !== ''){
        var linked = document.getElementById('linkedin').value
        changedMentor = true;
      }
     
     if(document.getElementById('bio').value !== form.bio && document.getElementById('bio').value !== ''){
          var mbio = document.getElementById('bio').value
          changedMentor = true;
        }
      

      //If a mentor changes any information
     if(changedMentor === true){
      try{
        const response = await fetch('http://localhost:9000/mentors', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.token}`
          },
          body: JSON.stringify({
            mentor_id : authState.user,
            bio : mbio,
            company : comp,
            linkedin_url: linked
          }),
        })
        return response.json();    
      }
      catch(err){
        console.log(err)
      }
     }

    //If the user Logged in is a mentee
    }else if(authState.userType === "mentee"){
      if(document.getElementById('parentName').value !== form.parentName && document.getElementById('parentName').value !== ''){
         var pName = document.getElementById('parentName').value
         changedMentee = true;
        }
      if(document.getElementById('parentEmail').value !== form.parentEmail && document.getElementById('parentEmail').value !== ''){
         var pEmail = document.getElementById('parentEmail').value
         changedMentee = true;
        }  

      //If a mentee changes any information
     if(changedMentee === true){
      try{
        const response = await fetch('http://localhost:9000/mentees', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.token}`
          },
          body: JSON.stringify({
            mentee_id : authState.user,
            parent_name : pName,
            parent_email : pEmail
          }),
        })
        return response.json();    
      }
      catch(err){
        console.log(err)
      }
     }
    }else{
      alert("Wait....How did you get here???");
    }
    setEditBtn(true)
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
         <div className='card w-75 col-8' style={{ background:"linear-gradient(45deg, #A0AAE7 40%, #BA92F3 90%)"}}>
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
                 {editBtn === true? 
                    (<input type='text' className='form-control' value={form.firstName} name='firstName' readonly="readonly"/>)
                   :(<input type='text' className='form-control' placeholder={form.firstName} id='firstName' name='firstName'/>)}
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='lastName' className='col-sm-2 col-form-label'>Last Name</label>
                 <div className='col-sm-10'>
                 {editBtn === true? 
                    (<input type='text' className='form-control' value={form.lastName} name='lastName' readonly="readonly"/>)
                   :(<input type='text' className='form-control' placeholder={form.lastName} id='lastName' name='lastName'/>)}
                 </div>
               </div>
               {editBtn === true? ('') 
                : (
                <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
                  <button className="btn btn-dark " onClick={submitClick}>Submit</button>
                </div>
              )}
               <div className='mb-3 row'>
                 <label htmlFor='company' className='col-sm-2 col-form-label'>Company</label>
                 <div className='col-sm-10'>
                 {editBtn === true? 
                    (<input type='text' className='form-control' value={form.company} name='company' readonly="readonly"/>)
                   :(<input type='text' className='form-control' placeholder={form.company} id='company' name='company'/>)}
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='linkedin' className='col-sm-2 col-form-label'>LinkedIn</label>
                 <div className='col-sm-10'>
                 {editBtn === true? 
                    (<input type='text' className='form-control' value={form.linkedin} name='linkedin' readonly="readonly"/>)
                   :(<input type='text' className='form-control' placeholder={form.linkedin} id='linkedin' name='linkedin'/>)}
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='careerField' className='col-sm-2 col-form-label'>Career Field </label>
                 <div className='col-sm-10'>
                   <Multiselect
                   ref = {careerChoice}
                   onChange = {getAllVals}
                   options={careers}
                   disablePreSelectedValues={editBtn}
                   selectedValues={selectedValues}
                   displayValue="key"
                   selectionLimit="1"
                   disable = {editBtn}
                   />
                 </div>
               </div>
               <div className='mb-3 row'>
                 <label htmlFor='bio' className='col-sm-2 col-form-label'>Bio</label>
                 <div className='col-sm-10'>
                 {editBtn === true? 
                    (<textarea rows="5" cols="5" className='form-control' value={form.bio} name='bio' readonly="readonly"/>)
                  : (<textarea className='form-control' rows="5" cols="5" placeholder={form.bio} id='bio' name='bio'/>)}
                 </div>
               </div>
             </form>
             {editBtn === true? ('') 
            : (
                <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
                  <button className="btn btn-dark " onClick={submitClickPart2}>Submit</button>
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
      <div className='card w-75 col-8' style={{ background:"linear-gradient(45deg, #A0AAE7 40%, #BA92F3 90%)"}}>
        <div className='card-body'>
          <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
          {editBtn === true? (<button className="btn btn-dark " onClick={btnClick}>Edit</button>) 
          : (<button className="btn btn-dark " onClick={btnClick}>Cancel</button>)}
            
          </div>
       
          <form>
            <div className='mb-3 row'>
              <label htmlFor='firstName' className='col-sm-2 col-form-label'>First Name</label>
              <div className='col-sm-10'>
              {editBtn === true? 
                (<input type='text' className='form-control' value={form.firstName} name='firstName' readonly="readonly"/>)
                :(<input type='text' className='form-control' placeholder={form.firstName} id='firstName' name='firstName'/>)}
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='lastName' className='col-sm-2 col-form-label'>Last Name</label>
              <div className='col-sm-10'>
              {editBtn === true? 
                (<input type='text' className='form-control' value={form.lastName} name='lastName' readonly="readonly"/>)
                :(<input type='text' className='form-control' placeholder={form.lastName} id='lastName' name='lastName' />)}
              </div>
            </div>
            {editBtn === true? ('') 
            : (
                <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
                  <button className="btn btn-dark " onClick={submitClick}>Submit</button>
                </div>
              )}
            <div className='mb-3 row'>
              <label htmlFor='parentName' className='col-sm-2 col-form-label'>Parent Name</label>
              <div className='col-sm-10'>
              {editBtn === true? 
                (<input type='text' className='form-control' value={form.parentName} name='parentName' disabled/>)
                :(<input type='text' className='form-control' placeholder={form.parentName} id='parentName' name='parentName'/>)}
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='parentEmail' className='col-sm-2 col-form-label'>Parent Email</label>
              <div className='col-sm-10'>
              {editBtn === true? 
                (<input type='text' className='form-control' value={form.parentEmail} name='parentEmail' readonly="readonly"/>)
               :( <input type='text' className='form-control' placeholder={form.parentEmail} id='parentEmail' name='parentEmail' />)}
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='careerFieldInterest' className='col-sm-2 col-form-label'>Career Field Interest</label>
              <div className='col-sm-10'>
                <Multiselect
                ref = {menteeCareer}
                onChange ={getAllVals()}
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
                  <button className="btn btn-dark " onClick={submitClickPart2}>Submit</button>
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