import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true, 
    }),
);
// Middleware to parse incoming JSON data with a size limit of 16KB
app.use(express.json({ limit: "16kb" })); // Set the limit to prevent excessively large payloads.

// Middleware to parse incoming URL-encoded data (from forms) with a size limit of 16KB
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Extended allows objects and arrays to be encoded.

// Middleware to serve static files (like images, stylesheets, etc.) from the 'public' directory
app.use(express.static("public")); // The 'public' folder must exist for this to work.

// Middleware to parse cookies from incoming requests
app.use(cookieParser()); // Cookies are parsed automatically and made available in `req.cookies`.


export {app};