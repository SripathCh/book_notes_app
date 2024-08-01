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
    database: "library",
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
    }
]

app.get("/", async (req, res) => {
    res.render("index.ejs", {books});
  });

  app.get("/new", async (req, res) => {
    res.render("new.ejs");
  });

  app.post("/new", async (req, res) => {
    const book_title = req.body.title;
    const book_author = req.body.author;
    const book_rating = req.body.rating;
    const book_review = req.body.review;
    const book_isbn = req.body.isbn;
    try {
      await db.query("INSERT INTO books (isbn, title, author, rating, review) VALUES ($1, $2, $3, $4, $5)",
        [book_isbn, book_title, book_author, book_rating, book_review]);
    }
    catch (err) {
      console.log(err);
    }
    
  });

// setting the app to listen on port 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });