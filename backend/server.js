import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// DataBase Connection
connectDB();

// app.use(notFound);
// app.use(errorHandler);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
console.log(__dirname);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

///
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.get("/api/config/paypal", (req, res) => {
  res.send(
    "AarReENZfhPjFyDGDSJq95BLbsHP9eODzdmhC_xNgiEXhmSZHaiLjJgXp27UEfnE4HUYjQdlvlsTeFpA"
  );
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}....!`));
