let {Packer } =  require("docx");
let { saveAs } = require("file-saver");
require('dotenv').config();
const tester = require('docx');
let {Document} = require('docxyz');
const {readFileSync, readFile} = require('fs');

let filename = 'Letter_Template.docx';
//let doc = new Document(filename);


const { OpenAIApi, Configuration } = require("openai");
const configuration = new Configuration({
    organization: process.env.ORG,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.port;

app.use(bodyParser.json());
app.use(cors());



app.post('/', async (req, res) => {
    const { message } = req.body;
    let promptHere = `${message} `;
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${promptHere}`,
        max_tokens: 491,
        temperature: 0,
      });
    const ressy = (response && response.data && response.data.choices[0].text);
    //promptHere = promptHere + ressy;
    console.log(ressy);
    let doc = new Document(filename);
    doc.add_paragraph(ressy);
    doc.save('Letter_Template_Copy.docx');
    

    let fileHere;
    readFile('Letter_Template_Copy.docx', (err, data) => {
        if (err) throw err;
        console.log(typeof data);
        fileHere = new Blob([data]);
        console.log( typeof fileHere);
        res.send(data);
    });
    
}
);



app.listen(port, () => {
    console.log(process.env.API_KEY);
    console.log(`Example app listening at http://localhost:${port}/`);
    }
);
