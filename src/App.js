
import Header from './components/Header';
import Form from './components/Form';
import React, { useState } from 'react';
import './App.css';
//import reCAPTCHA from "react-google-recaptcha"

let { saveAs } = require("file-saver");



function App() {

  const [message, setMessage] = useState('');
  const [docName, setDocName] = useState('Insert Doctor Name');
  const [reasonForLetter, setReasonForLetter] = useState('Insert Reason for Letter');
  const [illness, setIllness] = useState('Insert Illness');
  const [addressedTo, setAddressedTo] = useState('Insert Entity/Person Letter is Addressed To');
  let prompt = `Construct a letter from ${docName} about ${reasonForLetter} regarding ${illness}
  addressed to ${addressedTo} in a professional manner about a given patient. Write the letter as though it will be sent 
  as is outputted and is from the doctor`;
  const [nextPrompt, setNextPrompt] = useState('');

  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(docName);
    console.log(illness);
    console.log("hello world");
    prompt = `Construct a letter from ${docName} about ${reasonForLetter} regarding ${illness}
  addressed to ${addressedTo} in a professional manner about a given patient. Write the letter as though it will be sent 
  as is outputted and is from the doctor`;
  console.log(prompt);
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: prompt})
    })
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, "Letter_Here.docx")
      })
      .catch(err => console.error(err));
  }

  

  return (
    <div className="App">
      <Header />
      <textarea 
        rows = "6"
        value = {docName}
        onChange = {(e) => setDocName(e.target.value)}
        />
        <h1></h1>
        <textarea
        rows = "6"
        value = {reasonForLetter}
        onChange = {(e) => setReasonForLetter(e.target.value)}
        />
        <h1></h1>
        <textarea 
        rows = "6"
        onChange = {(e) => setIllness(e.target.value)}
        value = {illness}
        />
        <h1></h1>
        <form onSubmit={handleSubmit}>
        <textarea
          rows = "6"
          value={addressedTo}
          onChange={e => setAddressedTo(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
   

  );
}

export default App;
