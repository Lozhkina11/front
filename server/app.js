const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const { Photo } = require("./db/models");
// const uploads = require(".uploads");

dotenv.config();
const API_URL = process.env.API_URL || "http://localhost:3001";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/photos", express.static("uploads"));

// Настройка Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Уникальное имя файла
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Загрузка файла
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Файл не загружен" });
  }
  const fileUrl = `${API_URL}/photos/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Добавить новую фотографию
app.post("/photos", async (req, res) => {
  const { title, description, file } = req.body;

  try {
    const newPhoto = await Photo.create({
      title,
      description,
      file,
    });

    res.status(201).json(newPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при добавлении фотографии" });
  }
});

// Получить все фотографии
app.get("/photos", async (req, res) => {
  try {
    const photos = await Photo.findAll();
    res.json(
      photos.map((photo) => ({
        ...photo.toJSON(),
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при загрузке фотографий" });
  }
});

// Обновить фотографию
app.put("/photos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const photo = await Photo.findByPk(id);
    if (!photo) {
      return res.status(404).json({ error: "Фотография не найдена" });
    }

    photo.title = title;
    photo.description = description;

    await photo.save();

    res.json({ message: "Фотография успешно обновлена", item: photo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при обновлении фотографии" });
  }
});

app.delete("/photos/:id", async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: "Фотография не найдена" });
    }
    await photo.destroy();
    res.json({ message: "Фотография удалена" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при удалении фотографии" });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3001}`
  );
});
