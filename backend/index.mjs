import monogoConnect from "./db.mjs";
import express from "express";
import cors from 'cors';
import auth from './routes/auth.mjs';
import note from './routes/note.mjs';

monogoConnect();

const app = express()
app.use(cors())
app.use(express.json());

// Available Routes
app.use('/api/auth', auth);
app.use('/api/note', note);

const port = 5000
app.listen(port, () => {
  console.log(`iNotebook Backend server running at http://localhost:${port}`)
})