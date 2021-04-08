import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom'
import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Landing from './Pages/Landing'

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
        </Switch>
      </BrowserRouter>

    </div>
  )
}

export default App
