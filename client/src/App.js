import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom'
import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import MenteeProfile from "./Pages/MenteeProfile"
import MentorProfile from "./Pages/MentorProfile"
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
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/profile/mentee'>
            <MenteeProfile />
          </Route>
          <Route path='/profile/mentor'>
            <MentorProfile />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  )
}

export default App
