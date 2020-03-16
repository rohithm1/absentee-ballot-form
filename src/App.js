import React from 'react';
import './App.css';
import RegistrationForm from './components/registration'
import ReactHelmet from './components/helmet'

function App() {
  return (
    <div className="App">
      <ReactHelmet />
      <RegistrationForm />
    </div>
  );
}

export default App;
