import { BrowserRouter, Switch, Route} from 'react-router-dom'
import React from 'react'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Landing from './Pages/Landing'
import Homepage from './Pages/Homepage'
import Settings from './Pages/Settings'
import FindMentor from './Pages/FindMentor'
import history from './history'
import VerifyEmail from './Pages/VerifyEmail'
import Chat from './Components/Chat/Chat';
import ForgotPassword from './Pages/ForgotPassword'
import ChangePassword from './Pages/ChangePassword'
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      //console.log("this is the payload",action.payload)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id,
        userType: action.payload.user_type,
        name: action.payload.name,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userType: null,
        token: null,

      };
    default:
      return state;
  }
};

function App () {
  // Have state here later
  const [state, dispatch] = React.useReducer(reducer, initialState);
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
              {!state.isAuthenticated ? <Login /> : 
               <Homepage/>
              }
            </Route>

            <Route path='/homepage'>
               {!state.isAuthenticated ? <Login /> : <Homepage />}
            </Route>
            <Route path='/profile'>
              {!state.isAuthenticated ? <Login /> : <Profile />}
            </Route>
            <Route path='/settings'>
            {!state.isAuthenticated ? <Login /> : <Settings isMentor={false}/>}    
            </Route>
            <Route path='/find-mentor'>
              {!state.isAuthenticated ? <Login /> : <FindMentor />}
            </Route>
            <Route path="/verify-emailToken/:mentee_id/:mentor_id/:token">
              <VerifyEmail />
            </Route>
          <Route exact path='/forgotPassword'>
              <ForgotPassword />
          </Route>
          <Route exact path='/:user_id/changePassword'>
            <ChangePassword />
          </Route>
            <Route
            path="/:roomId/:name"
            render={(props) => <Chat {...props} token={state.token} userId={state.user} user ={state.name} />}
          />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App
