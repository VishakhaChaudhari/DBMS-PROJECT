const express = require('express')
const app =express()
const port = 8000
const bodyParser = require('body-parser')
app.use(express.static(__dirname));


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/surveyForm.html");
})
app.use(bodyParser.urlencoded({extended:false}))

app.get("/submit",(req,res)=>{
    console.log("Data Saved");
})


const {Client} = require('pg')

const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "123456",
    database : "abc"
})


app.post("/",(req,res)=>{
    const {name,email,pincode,phoneno} = req.body
    client.connect()
    client.query('insert into surveyData values($1,$2,$3,$4)',[name,email,pincode,phoneno],(err,res)=>{
        console.log(err,res);
        client.end();
    })

    res.sendFile(__dirname + "/surveyForm.html");

})

app.listen(port,()=>{
    console.log(`App is listening at port ${port}!`);
})