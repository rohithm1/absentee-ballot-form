import React from 'react';
import RegistrationForm from './components/registration'
import ReactHelmet from './components/helmet'
import './App.scss'


function App() {
  return (
    <div className="App">
      <ReactHelmet />
      <RegistrationForm />
    </div>
  );
}

export default App;
