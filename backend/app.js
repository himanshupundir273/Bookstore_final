import express from "express";
import "dotenv/config";
import dbconnect from "./dbConnect.js";
import { Book } from "./model/bookModel.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
const start = async () => {
  try {
    await dbconnect(process.env.MONGO_URL);
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`App is started at: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.get("/page", (req, res) => {
  res.send("<h1>Welcome to Second Screen</h1>");
});

app.post("/pagedata", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.json({
        success: false,
        message: "Please provide all the details",
      });
    }
    await Book.create(req.body);
    res.json({
      success: true,
      message: "Entry created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Undefined error",
    });
  }
});

app.get("/showallbooks", async (req, res) => {
  try {
    const book = await Book.find();
    if (!book) {
      res.status(400).json({
        message: "Book not found",
      });
    }
    res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Cannot fetch Book",
    });
  }
});

app.get("/bookfinder/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(500).json({
        success: false,
        message: `Book with this ${id} is not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Book mil gayi hai with ${id}`,
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Cannot fetch Book",
    });
  }
});

app.put("/updatebook/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  try {
    if (!title || !author || !year) {
      return res.status(500).json({
        success: false,
        message: "Please provide all the details",
      });
    }
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!result)
      return res.status(500).json({
        msg: `Book with id ${id} not found`,
        success: false,
      });
    res.status(200).json({
      msg: "Book Updated",
      success: true,
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot update Book",
    });
  }
});

app.get("/page/:id", (req, res) => {
  res.send("Get a Book");
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res.status(500).json({ msg: `Book not found with id - ${id}` });
    res.status(200).json({ msg: "Book Deleted", data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

app.get("*", (req, res) => {
  res.send("<h1>Welcome to Home Screen</h1>");
});
