import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom'
import React from 'react'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import MenteeProfile from "./Pages/MenteeProfile"
import MentorProfile from "./Pages/MentorProfile"
import Landing from './Pages/Landing'
import Homepage from './Pages/Homepage'
import Settings from './Pages/Settings'
import FindMentor from './Pages/FindMentor'
import history from './history'

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", JSON.stringify(action.payload.token));
      console.log("this is the payload",action.payload)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id,
        userType: action.payload.user_type,
        token: action.payload.token,
      };
    case "LOGOUT":
      // localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App () {
  // Have state here later
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [test, setTest] = React.useState({})

  React.useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => setTest({ apiResponse: res }))
  }, [])

  return (
    <AuthContext.Provider  value={{state,dispatch}}>
      <div className='App'>
    
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path='/'>
                <Landing />
              </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/login'>
              {!state.isAuthenticated ? <Login /> : <FindMentor/>
                // state.userType === "mentor"? <MentorProfile/>: <MenteeProfile/>
              }
              {console.log(state.userType)}
            </Route>
            <Route path='/homepage'>
              <Homepage />
            </Route>
            <Route path='/profile/mentee'>
              {!state.isAuthenticated && state.userType === "mentee"? <Login /> : <MenteeProfile />}
            </Route>
            <Route path='/profile/mentor'>
              {!state.isAuthenticated && state.userType === "mentor" ? <Login /> : <MentorProfile />}
            </Route>
            <Route path='/settings'>
              <Settings isMentor={false}/>
            </Route>
            <Route path='/find-mentor'>
              <FindMentor />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App
