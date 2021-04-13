import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom'
import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import MenteeProfile from "./Pages/MenteeProfile"
import MentorProfile from "./Pages/MentorProfile"
import Landing from './Pages/Landing'
import Homepage from './Pages/Homepage'
import Settings from './Pages/Settings'
import FindMentor from './Pages/FindMentor'
import history from './history'

import './App.css'

function App () {
  // Have state here later
  const [test, setTest] = React.useState({})

  React.useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => setTest({ apiResponse: res }))
  }, [])

  return (
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
            <Login />
          </Route>
          <Route path='/homepage'>
            <Homepage />
            </Route>
          <Route path='/profile/mentee'>
            <MenteeProfile />
          </Route>
          <Route path='/profile/mentor'>
            <MentorProfile />
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
  )
}

export default App
