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

// Dummy data for books
const books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover_url: 'https://example.com/great-gatsby.jpg',
      rating: 5,
      review: 'A classic piece of American fiction.',
      date_read: '2023-01-01'
    },
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover_url: 'https://example.com/great-gatsby.jpg',
        rating: 5,
        review: 'A classic piece of American fiction.',
        date_read: '2023-01-01'
      },
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover_url: 'https://example.com/great-gatsby.jpg',
        rating: 5,
        review: 'A classic piece of American fiction.',
        date_read: '2023-01-01'
      },
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover_url: 'https://example.com/great-gatsby.jpg',
        rating: 5,
        review: 'A classic piece of American fiction.',
        date_read: '2023-01-01'
      },
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover_url: 'https://example.com/great-gatsby.jpg',
        rating: 5,
        review: 'A classic piece of American fiction.',
        date_read: '2023-01-01'
      },
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover_url: 'https://example.com/great-gatsby.jpg',
        rating: 5,
        review: 'A classic piece of American fiction.',
        date_read: '2023-01-01'
      },
    // Add more book objects here
  ];

app.get("/", async (req, res) => {
    res.render("index.ejs", {books});
  });

// setting the app to listen on port 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });