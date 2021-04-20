import React,{useState, useEffect} from 'react'
import Form from '../Hooks/Form'
import Footer from "../Components/Footer"
import LoginNav from "../Components/LoginedNavBar"

import { AuthContext } from "../App";

function Settings () {

  const { state: authState } = React.useContext(AuthContext);
  const userId = authState.user; 
  const authToken = authState.token; 
  const [isDisable, setDisable] = useState(true)
  const [editBtn, setEditBtn]  = useState("Edit")
  const [userData, setUserData] = useState({
    email: '',
    oldPassword: '', 
    newPassword: '', 
  })

  useEffect(() => { 
    async function getUserInfo() {
      const response = await (fetch('http://localhost:9000/users/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`
        },
        body: JSON.stringify({
          user_id: userId
        })
      }))
      const result = await response.json()
      const data = await result.data[0]; 
      console.log(data); 

      setUserData({
        email: result.data[0].email
      })
     
  }
    getUserInfo();   
  
  },[userId])


  function handleChange (event) {
    const name = event.target.name
    const value = event.target.value

    setUserData({
      ...userData,
      [name]: value
    })
  }

  async function checkPassword() {
    const response = await (fetch('http://localhost:9000/users/pass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      },
      body: JSON.stringify({
        user_id: userId,
        password: userData.oldPassword
      })
    }))

    return response.json(); 
  }

  async function updateUserInfo() {
    console.log("line 75 this is the update fetch function")
    const response = await (fetch('http://localhost:9000/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      },
      body: JSON.stringify({
        user_id: userId,
        password: userData.newPassword
      })
    }))
    return response; 
  }
 
  function enableEdit () {
    if(isDisable === true) {
      setDisable(false)
      setEditBtn("Cancel")
    } else {
      setDisable(true)
      setEditBtn("Edit")
    }
  }


  const handleSubmit = async e =>  {
    e.preventDefault();
    let isValidRequest = await checkPassword(); 
    if(isValidRequest.isVerified) {
      console.log("line 110 inside the if statemnt")
      updateUserInfo()
    } else {
      console.log("error! can't make changes")
    }
  }

  return(
    <div>

        <LoginNav userType={userType} authToken={authToken}/>
      <div className="container"  style={{ marginTop:"10%",  marginBottom:"10%"}}>
     
    <div className='containter d-flex justify-content-center'  style={{ marginTop:"1%"}}>
    
      <div className='card w-75 col-8' style={{ background:"linear-gradient(45deg, #A0AAE7 40%, #BA92F3 90%)"}}>
        <div className='card-body'>
          <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
            <button className="btn btn-dark" onClick={enableEdit}>{editBtn}</button>
          </div>
       
          <form onSubmit={handleSubmit}>
            <div className='mb-3 row'>
              <label htmlFor='firstName' className='col-sm-2 col-form-label'>Email</label>
              <div className='col-sm-10'>
                <input className='form-control' disabled={isDisable} value={userData.email} onChange={handleChange} type='email' id='email' name='email' />
              </div>
            </div>
            
            <div className='mb-3 row'>
              <label htmlFor='password' className='col-sm-2 col-form-label'>Old Password</label>
              <div className='col-sm-10'>
                <input className='form-control' disabled={isDisable} value={userData.oldPassword} onChange={handleChange} type='password' id='oldPassword' name='oldPassword' />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='password' className='col-sm-2 col-form-label'>New Password</label>
              <div className='col-sm-10'>
                <input className='form-control' disabled={isDisable} value={userData.newPassword} onChange={handleChange} type='password' id='newPassword' name='newPassword' />
              </div>
            </div>
                <button href='#' className='btn btn-dark' >
                     Submit
                </button>
          </form>

//       <LoginNav/>
//         <div className="container"  style={{ marginTop:"10%", height: "40vh", marginBottom:"10%"}}>
//           <div className='containter d-flex justify-content-center'  style={{ marginTop:"1%"}}>
//             <div className='card w-75 col-8' style={{ background:"linear-gradient(45deg, #A0AAE7 40%, #BA92F3 90%)"}}>
//               <div className='card-body'>
//                 <div className="d-flex justify-content-end" style={{ marginBottom:"1%"}}>
//                   <button className="btn btn-dark" onClick={enableEdit}>{editBtn}</button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className='mb-3 row'>
//                     <label htmlFor='firstName' className='col-sm-2 col-form-label'>Email</label>
//                     <div className='col-sm-10'>
//                       <input className='form-control' disabled={isDisable} value={userData.email} onChange={handleChange} type='email' id='email' name='email' />
//                     </div>
//                   </div>
//                   <div className='mb-3 row'>
//                     <label htmlFor='password' className='col-sm-2 col-form-label'>Old Password</label>
//                     <div className='col-sm-10'>
//                       <input className='form-control' disabled={isDisable} value={userData.oldPassword} onChange={handleChange} type='password' id='oldPassword' name='oldPassword' />
//                     </div>
//                   </div>
//                   <div className='mb-3 row'>
//                     <label htmlFor='password' className='col-sm-2 col-form-label'>New Password</label>
//                     <div className='col-sm-10'>
//                       <input className='form-control' disabled={isDisable} value={userData.newPassword} onChange={handleChange} type='password' id='newPassword' name='newPassword' />
//                     </div>
//                   </div>
//                   <div>
//                     <button type="submit" hidden={isDisable} className='btn btn-dark '>
//                         Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

        </div>
      <Footer/>
    </div>
  )
}
export default Settings