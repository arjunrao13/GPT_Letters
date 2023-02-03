
import Header from './components/Header';
import Form from './components/Form'; 
import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
const FormData = require('form-data');

let { saveAs } = require("file-saver");



function App() {
  console.log(process.env.REACT_APP_API_URL);

  const API_URL = process.env.REACT_APP_API_URL;
  const numRowsTextBox = "3";
  const [docName, setDocName] = useState('');
  const [reasonForLetter, setReasonForLetter] = useState('');
  const [illness, setIllness] = useState('');
  const [addressedTo, setAddressedTo] = useState('');
  const [isVerifiedRecaptcha, setVerifiedRecaptcha] = useState(false);

  let prompt = `Construct a letter from ${docName} about ${reasonForLetter} regarding ${illness}
  addressed to ${addressedTo} in a professional manner about a given patient. Write the letter as though it will be sent 
  as is outputted and is from the doctor`;
  

  
  const handleRecaptchaChange = (value) => {
    setVerifiedRecaptcha(true);
    console.log(isVerifiedRecaptcha);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(docName);
    console.log(illness);
    console.log("hello world");
    prompt = `Construct a letter from ${docName} about ${reasonForLetter} regarding ${illness}
  addressed to ${addressedTo} in a professional manner about a given patient. Write the letter as though it will be sent 
  as is outputted and is from the doctor`;
  console.log(prompt);
    fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: prompt}),

    })
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, "Letter_Here.docx")
      })
      .catch(err => console.error(err));
  }

  const handleSubmitFile = (e) => {

    e.preventDefault();
    const file = e.target.files[0];

    const form = new FormData();
    form.append('uploadedFile', file);
    fetch(`${API_URL}/postFile`, {
      method: 'POST',
      body:form
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));

    }
  

  

  return (
    <div className="App">
      <Header />
      <div className = "container">
      <span>Provider Name</span>
        <textarea 
          rows = {numRowsTextBox}
          value = {docName}
          onChange = {(e) => setDocName(e.target.value)}
          />
          <span>Addressed To</span>
          <textarea
          rows = {numRowsTextBox}
          value = {reasonForLetter}
          onChange = {(e) => setReasonForLetter(e.target.value)}
          />
          <span>Reason for Letter</span>
          <textarea 
          rows = "5"
          onChange = {(e) => setIllness(e.target.value)}
          value = {illness}
          />
          <span>Illness</span>
          <form onSubmit={handleSubmit}>
          <textarea
            rows = "5"
            value={addressedTo}
            onChange={e => setAddressedTo(e.target.value)}
          />
          <input 
            type="file"
            onChange = {(e) => handleSubmitFile(e)}
          />
          <ReCAPTCHA
            align="left"
            width="30"
            sitekey= {process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            />
          <button disabled = {!isVerifiedRecaptcha} type="submit">Submit</button>
        </form>
      </div>
      {/* <Footer/> */}
    </div>
   

  );
}

export default App;
