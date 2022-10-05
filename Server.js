const projectData = {};

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8080;

//start the app
const app = express();

//put middleware on the app
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());


//sets the root folder
app.use(express.static("website"));

//initialize the server
app.listen(port, listening);

function listening() {
    console.log(`the server is running on port: ${port}`);
}

//get route to projectData
app.get("/all", (req, res) => {
    res.send(projectData);
})

//post route to add incoming data to projectData
app.post("/addData", addData);
function addData(req, res) {
    //saving the current data into the projectData to change the UI
    projectData["Temperature"] = req.body.temperature;
    projectData["Date"] = req.body.Date;
    projectData["Feelings"] = req.body.UserInput;
    res.send(projectData);
    console.log(projectData);
};
