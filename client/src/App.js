import logo from './logo.svg';
import React from 'react'; 
import './App.css';

function App() {
  const [test, setTest] = React.useState({}); 

  React.useEffect(() => {
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => setTest({ apiResponse: res }));
  },[])
  
  return (
    <div className="App">
    <p> Test </p>
      <p className="App-intro">{test.apiResponse}</p>
    </div>
  );
}

export default App;
