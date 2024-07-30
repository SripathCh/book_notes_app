import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// setting the app to express server and port number to 30000
const app = express();
const port = 3000;

// using pg Client to connect to the database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "StayPositive24",
    port: 5432,
});
db.connect();

// using the bodyparser and setting the static folder to public from where we get all 
// the images and styling for the website
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// setting the app to listen on port 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });