import './App.css';
import React from 'react'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
      <h1>Hello, Chat!</h1>

      {/* component for displaying messages */}
      {/* <Display /> */}

      {/* component for submitting messages */}
      <Form />
    </div>
  );
}

export default App;
