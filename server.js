import { config } from "dotenv";
// .env setup
config();
import express from "express";
// import express from 'express';
import mongoose from 'mongoose';

import { shortUrl,redirectUrl } from './controllers/url.js'; // Adjust path if needed

const app = express(); // <-- Move this line up

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, { dbName: "Mongodb_connection" })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

//   Rendering the ejs file
app.get('/', (req, res) => {
    res.render('index.ejs', { shortenedUrl: null });
});
// POST route to handle URL shortening
app.post('/shorten', shortUrl);

// redirect to original URL
app.get('/:shortCode', redirectUrl);

const port = process.env.PORT ;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});