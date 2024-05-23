import express, { json } from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';


const app = express();

// Middleware
app.use(express.json());

// Middleware for handling CORS
// Option 1: allow all origins (not recommended for production) with default of cors(*)
// app.use(cors());

// Option 2: allow only specific origins

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome To Book Store");
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
