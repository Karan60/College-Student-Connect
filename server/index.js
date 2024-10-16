import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true,
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for the /signup route specifically
app.options('/signup', cors()); // Preflight OPTIONS request handling

// Define your routes
app.use("/", Router);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
    console.log(`Server is running successfully on PORT ${PORT}`)
);

// Database Connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);