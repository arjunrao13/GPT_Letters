let {Packer } =  require("docx");
let { saveAs } = require("file-saver");
require('dotenv').config();
const tester = require('docx');
let {Document} = require('docxyz');
const {readFileSync, readFile} = require('fs');

let filename = 'Letter_Template.docx';
let doc = new Document(filename);
// function saveDocumentToFile(doc, fileName) {
//     const packer = new Packer();
//     const mimeType =
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
//     packer.toBlob(doc).then((blob) => {
//       const docblob = blob.slice(0, blob.size, mimeType);
//       saveAs(docblob, fileName);
//     });
//   }


const { OpenAIApi, Configuration } = require("openai");
const configuration = new Configuration({
    organization: process.env.ORG,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.port;

app.use(bodyParser.json());
app.use(cors());


let promptHere = `This is a conversation with a psychiatrist. The psychiatrist is attempting to take a patient through a question tree 
to determine if the patient fits symptoms of depression, anxiety, or ADD. If the patient fits reasonable symptoms for diagnosis, please let them know. 
Keep all responses under 30 words. The psychiatrist will ask the patient a question, and the patient will respond
Psychiatrist: Hello, how are you feeling today?`;
app.post('/', async (req, res) => {
    const { message } = req.body;
    promptHere += `
    Patient: ${message} 
    Doc: `
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${promptHere}`,
        max_tokens: 40,
        temperature: 0,
      });
    const ressy = (response && response.data && response.data.choices[0].text);
    promptHere = promptHere + ressy;
    //res.json({ message: `${promptHere}`});
    console.log(promptHere);
    doc.add_paragraph(promptHere);
    doc.save('Letter_Template_Copy.docx');
    
    //saveDocumentToFile(doc, 'Letter_Template_Here.docx');
    //let hello = new File("Letter_Template_Copy.docx");
    let fileHere;
    readFile('Letter_Template_Copy.docx', (err, data) => {
        if (err) throw err;
        console.log(typeof data);
        fileHere = new Blob([data]);
        console.log( typeof fileHere);
        res.send(data);
    });
    //saveAs(fileHere , 'Letter_Template_Copy.docx');
    //res.json({ message: `${promptHere}`});
    
    //res.send(prompt);
}
);



app.listen(port, () => {
    console.log(process.env.API_KEY);
    console.log(`Example app listening at http://localhost:${port}/`);
    }
);
