import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiError } from "./utils/apiError.js"; // Import your custom error class
import path from "path";
import { fileURLToPath } from "url";

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "frontend")));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Routes
import userRouter from "./routes/user.routes.js";
app.use("/api/users", userRouter);



// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof apiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // Default Error Handler
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

// Export the app
export { app };
