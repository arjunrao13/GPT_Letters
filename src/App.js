

import React, { useState } from 'react';
import './App.css';
let { saveAs } = require("file-saver");



function App() {

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [nextPrompt, setNextPrompt] = useState('');

  let prompt = `This is a conversation with a psychiatrist. The psychiatrist is attempting to take a patient through a question tree 
   to determine the patient's mental state. The psychiatrist will ask the patient a question, and the patient will respond
   Psychiatrist: Hello, how are you feeling today?
   Patient:`;


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, "Letter_Here.docx")
      })
      .catch(err => console.error(err));
  }

  

  return (
    <div className="App">
      <h1>Letter Request</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
