// api all data
const data = {};
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
//get the data response from the api with clicking on generate
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=a3ecc5030d8f7ad4881e42f1e729542b&units=metric";
// get user response in variable
const userResponse = document.getElementById("feelings").value;
//get zip
const zip = document.getElementById("zip").value;
document.getElementById("generate").addEventListener("click", performFunction);

function performFunction(e) {
    // get user response in variable
    const userResponse = document.getElementById("feelings").value;
    //get zip entered
    const zip = document.getElementById("zip").value;
    //call the get function and add the data when recieved to the server
    getTemp(baseUrl, apiKey, zip).then(function(data) {
        postData("/addData", {
            temperature: data.main.temp,
            Date: newDate,
            UserInput: userResponse,
        });
    }).then(function(){updateUI();});
}
//creating a post request to save the data we got from the api into our server app /api > this makes the server recieves and saves the data entered
const postData = async function(url = "", data = {}) {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = res.json();
        return newData;
    } catch (error) {
        console.log("Posting data gave error:" + error);
    }
};
//get request to the api > this gets the temperature
const getTemp = async function(baseUrl, apiKey, zip) {
    const res = await fetch(baseUrl + zip + apiKey);
    try {
        const apiData = await res.json();
        return apiData;
    } catch (error) {
        console.log("error is " + error);
        console.log(baseUrl + apiKey);
    }

};
//updating the UI function
const updateUI = async ()=>{
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        document.getElementById("temp").innerHTML = allData.Temperature + " degrees";
        document.getElementById("content").innerHTML =  allData.Feelings;
        document.getElementById("date").innerHTML = "the date is:(" + newDate + ")";

    }catch(e){
        console.log("error:"+ e);
    }
}