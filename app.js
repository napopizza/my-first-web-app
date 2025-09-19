import express from "express";
import path from "path";
import { readFile, writeFile } from "fs/promises";

export const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// /api/flashcards に GETリクエストが来たら "flashcards.json" の内容を返す
app.get("/api/flashcards", async (req, res) => {
  const flashcardsJsonPath = path.join(__dirname, "data", "flashcards.json");
  const data = await readFile(flashcardsJsonPath);
  const flashcardsList = JSON.parse(data);
  res.json(flashcardsList);
});

// /api/flashcards に POSTリクエストが来たら "flashcards.json" に追加し、追加したデータを返す
app.post("/api/flashcards", async (req, res) => {
  const flashcardsJsonPath = path.join(__dirname, "data", "flashcards.json");
  const data = await readFile(flashcardsJsonPath);
  const flashcardsList = JSON.parse(data);
  const newWord = req.body;

  if (!newWord.id) {
    newWord.id = Date.now();
  }

  flashcardsList.push(newWord);

  await writeFile(flashcardsJsonPath, JSON.stringify(flashcardsList, null, 2));

  res.status(201).json(newWord);
});
