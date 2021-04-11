import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom'
import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import MenteeProfile from "./Pages/MenteeProfile"
import MentorProfile from "./Pages/MentorProfile"
import Landing from './Pages/Landing'
import Homepage from './Pages/Homepage'
<<<<<<< HEAD
import Settings from './Pages/Settings'
=======
import FindMentor from './Pages/FindMentor'
>>>>>>> 685c10d49373c16d6ff87f4890d2622138ceb916

import './App.css'

function App () {
  // We are testing adding
  const [test, setTest] = React.useState({})

  React.useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => setTest({ apiResponse: res }))
  }, [])

  return (
    <div className='App'>
      <p className='App-intro'>{test.apiResponse}</p>
      <BrowserRouter>
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
            <Homepage isMentor={true} />
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
