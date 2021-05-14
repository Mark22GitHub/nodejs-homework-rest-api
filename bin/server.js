const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const contactsRouter = require("../routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const PORT = process.env.PORT || 3000;
const uriDB = process.env.DB_HOST;

const connectionToMongoDB = mongoose.connect(uriDB, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const server = async () => {
  try {
    await connectionToMongoDB;
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

    app.use(logger(formatsLogger));
    app.use(cors());
    app.use(express.json());

    app.use("/api/contacts", contactsRouter);

    app.use((req, res) => {
      res.status(404).json({ message: "Not found" });
    });

    app.use((err, req, res, next) => {
      res.status(500).json({ message: err.message });
    });
  } catch (err) {
    console.log("Database connection failed"),
      console.log(`Server not running. Error message: ${err.message}`),
      process.exit(1);
  }
};

server();
