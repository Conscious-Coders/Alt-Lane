import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Landing from "./Pages/Landing";
import Homepage from "./Pages/Homepage";
import Settings from "./Pages/Settings";
import FindMentor from "./Pages/FindMentor";
import history from "./history";
import VerifyEmail from "./Pages/VerifyEmail";
import Chat from "./Components/Chat/Chat";

export const AuthContext = React.createContext();

const initialState = {
  isAuthorized: false,
  user_id: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user_id));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthorized: action.payload.isAuthorized,
        user_id: action.payload.user_id,
        userType: action.payload.user_type,
        name: action.payload.name,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthorized: false,
        user_id: null,
        userType: null,
        name: null,
        token: null,
      };
    default:
      return state;
  }
};

function App() {
  // Have state here later
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              {!state.isAuthorized ? <Login /> : <Redirect to="/homepage" />}
            </Route>

            <Route path="/homepage">
              {!state.isAuthorized ? <Redirect to="/login" /> : <Homepage />}
            </Route>
            <Route path="/profile">
              {!state.isAuthorized ? <Redirect to="/login" /> : <Profile />}
            </Route>
            <Route path="/settings">
              {!state.isAuthorized ? (
                <Redirect to="/login" />
              ) : (
                <Settings isMentor={false} />
              )}
            </Route>
            <Route path="/find-mentor">
              {!state.isAuthorized ? <Redirect to="/login" /> : <FindMentor />}
            </Route>
            <Route path="/verify-emailToken/:mentee_id/:mentor_id/:token">
              <VerifyEmail />
            </Route>
            <Route
              path="/:roomId/:name"
              render={(props) => (
                <Chat
                  {...props}
                  token={state.token}
                  userId={state.user}
                  user={state.name}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
