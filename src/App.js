// Create a react component that inputs a textarea message and then performs a fetch request to localhost:3000 and gets back a response as a data.message and displays the message in an aeshetic box below the textarea.
//
// The server should be able to handle multiple requests and should be able to handle multiple messages at once.
//

import React, { useState } from 'react';
import './App.css';
//let {Packer } =  require("docx");
let { saveAs } = require("file-saver");
//let {Document} = require('docxyz');
//let {Dock} = require('docx');
//let filename = '../Letter_Template_Copy.docx';
//let doc = new Document(filename);


function App() {

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [nextPrompt, setNextPrompt] = useState('');
  // setNextPrompt(`This is a conversation with a psychiatrist. The psychiatrist is attempting to take a patient through a question tree 
  // to determine the patient's mental state. The psychiatrist will ask the patient a question, and the patient will respond
  // Psychiatrist: Hello, how are you feeling today?
  // Patient:`);
  let prompt = `This is a conversation with a psychiatrist. The psychiatrist is attempting to take a patient through a question tree 
   to determine the patient's mental state. The psychiatrist will ask the patient a question, and the patient will respond
   Psychiatrist: Hello, how are you feeling today?
   Patient:`;

  //  function saveDocumentToFile(fileName) {
  //   let doc = new Document(filename);
  //   doc.add_paragraph(response);
  //   doc.save();
    //let actualDoc = new Dock(doc.loadDocx());
    // const packer = new Packer();
    // const mimeType =
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    // packer.toBlob(actualDoc).then((blob) => {
    //   const docblob = blob.slice(0, blob.size, mimeType);
     // saveAs("../Letter_Template.docx", fileName);
    //});
  //}

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        //'Content-Type': Blob.type
      },
      body: JSON.stringify({ message })
    })
      //.then(res => res.json())
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, "Letter_Here.docx")
      })
      //.then(data => setResponse(data.message))
      //.then(data => saveDocumentToFile('../Letter_Template_Copy.docx'))
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
