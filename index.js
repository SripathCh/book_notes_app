import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "library",
    password: "StayPositive24",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// async function fetchBookCover (isbn) {
//   const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const base64Image = Buffer.from(response.data, 'binary').toString('base64');
//     return `data:image/jpeg;base64,${base64Image}`;
//   } catch (error) {
//     console.error(`Error fetching cover for ISBN: ${isbn}`, error.message);
//     return '/images/default-image.jpg'; // Default cover image
//   }
// };

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    const items = result.rows;

    // for (const item of items) {
    //   const coverUrl = await fetchBookCover(item.isbn);
    //   item.cover_url = coverUrl;
    // }

    res.render("index.ejs", { books: items });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/new", async (req, res) => {
  const book_title = req.body.title;
  const book_author = req.body.author;
  const book_rating = req.body.rating;
  const book_review = req.body.review;
  const book_isbn = req.body.isbn;

  try {
    await db.query("INSERT INTO books (isbn, title, author, rating, review) VALUES ($1, $2, $3, $4, $5)", [book_isbn, book_title, book_author, book_rating, book_review]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }

  res.redirect("/");
});


app.get('/edit/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
    res.render('edit.ejs', { book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving book review");
  }
});

app.post("/edit-review", async (req, res) => {
  const bookId = req.params.id;
  const { review } = req.body.review ;
  try {
    await db.query('UPDATE books SET review = $1 WHERE id = $2', [review, bookId]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating the book review");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
