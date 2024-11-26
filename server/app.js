const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");

const API_URL = process.env.API_URL || "http://localhost:3001";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/photos", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  // res.send(`File uploaded successfully!`);
  res.json({ url: `${API_URL}/photos/${req.file.originalname}` });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3001}`
  );
});
