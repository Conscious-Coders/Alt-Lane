import React, {useState }from 'react'
import Footer from '../Components/Footer'
import LandingNavBar from '../Components/LandingNavBar'
import {Redirect} from 'react-router-dom';
import { AuthContext } from "../App";
import Button from '../Components/Button'

const FETCH_URL = process.env.NODE_ENV === 'production' ? 'https://alt-lane.herokuapp.com/' : 'http://localhost:9000/'

function Login () {
  const { dispatch } = React.useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [form, setForm] = React.useState(initialState);

  const handleChange  =  event =>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const [token, setToken] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    setForm({
      ...form,
      isSubmitting: true,
      errorMessage: null
    });

    
    try{
      await fetch(`${FETCH_URL}users/login`, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      }).then((res)=> res.json()).then(data =>{
        dispatch({
          type: "LOGIN",
          payload: data
        })
          setToken(data.token);  
      })
      
    }
    catch(error){
      setForm({
        ...form,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
    }
    
}

  if(typeof token === undefined){
    return <Redirect to='/login'/>
  }
  else if(token) {
    return <Redirect to='/homepage'/>
  } 

  return (
    <div>
      <LandingNavBar/>
      <div className="container" style={{ marginTop:"2%", minHeight: "60vh", marginBottom:"10%"}}>
        <img src='/alt_lane_black.png' style={{ width: '125px', margin:"3%", height: 'auto', }} alt="alt-line logo"/>
        <div className='containter d-flex justify-content-center'>
          <div className='card w-50' style={{marginTop: "50px auto",padding: "10px", boxShadow: "2px 2px 3px 2px rgba(0,0,0,0.2)"}}>
            <div className='container card-body' style={{padding: "20px 15px"}} >
              <form onSubmit={handleSubmit} style={{marginTop: '5%'}}>
                <div className='mb-3 row'>
                  <label htmlFor='email' className='col-sm-3 col-form-label' style={{fontFamily: "'Chivo', sans-serif", color: "#764288", paddingLeft: "20px"}}>Email</label>
                  <div className='col-sm-8'>
                    <input className='form-control'            
                      value={form.email}
                      onChange={handleChange}
                      type='email'
                      id='email'
                      name='email' />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label htmlFor='password' className='col-sm-3 col-form-label' style={{fontFamily: "'Chivo', sans-serif", color: "#764288", paddingLeft: "20px"}}>Password</label>
                  <div className='col-sm-8'>
                    <input className='form-control' 
                      value={form.password}
                      onChange={handleChange} 
                      type='password' 
                      id='password'
                      name='password' />
                  </div>
                </div>
                {form.errorMessage && (
                <span className="form-error">{form.errorMessage}</span>
                )}
                <Button 
                  href='#' 
                  className='btn btn-dark' 
                  style={{margin: "10px"}} 
                  disabled={form.isSubmitting} 
                  name={form.isSubmitting ? (
                    "Loading..."
                  ) : (
                    "Login"
                  )}>
                  
                </Button>
                <br></br>
              </form>
            </div>
          </div>

        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Login