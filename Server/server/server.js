const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');

const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/predict", (req, res) => {
    const inputData = req.body.inputData;// User data sent via POST
    const modelNo = req.body.modelNo; 
    console.log("inputData on server.js: ", inputData);
    console.log("modelNo on server.js: ", modelNo);
    PythonShell.run('./model_1.py', { args: [JSON.stringify(inputData), modelNo] }).then(results => {
      console.log("result: ", results)  
      const predictionResult = JSON.parse(results[0]);
        // Send the prediction result back to the user
        console.log("Model tahmin etti: ", predictionResult);
        res.json({ prediction: predictionResult });
      });
  });


  app.use(express.json());

// Read the CSV file and convert it to JSON
function readCSVFile() {
  const data = [];
  let rowCount = 0;
  fs.createReadStream('merged_players_df_final.csv') // Replace 'data.csv' with your CSV file's path
    .pipe(csv())
    .on('data', (row) => {
        if(rowCount < 10){
            rowCount++;
            data.push(row);
        }
            
    })
    .on('end', () => {
      console.log('CSV file successfully processed.');
      // Send the JSON data to the frontend
      app.get('/api/data', (req, res) => {
        res.json(data);
      });
    });
}

readCSVFile();


app.listen(5000, () => {console.log("Server started on port 5000")})






