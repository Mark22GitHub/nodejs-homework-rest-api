const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const contactsRouter = require("../contacts/contacts.routes");
const usersRouter = require("../users/users.routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

require("../api/service/token");

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

    // static img
    // app.use(express.static("public"));

    // static img
    const { join } = require("path");
    const STATIC_FILES_DIR = join(__dirname, "../public");
    app.use(express.static(STATIC_FILES_DIR));

    // ===========================ANOTHER FILES======================================

    // const multer = require("multer");
    // const { extname, join } = require("path");

    // const STATIC_FILES_DIR = join(__dirname, "../public");
    // const ORIGINAL_FILES_DIR = join(__dirname, "../tmp");

    // // =====2.DiskStorage
    // const path = require("path");
    // //  const { extname, join } = require("path");

    // const diskStorage = multer.diskStorage({
    //   destination: ORIGINAL_FILES_DIR,

    //   filename: (req, file, cb) => {
    //     const ext = extname(file.originalname);
    //     // const ext = extname(req.file.originalname);
    //     // const fileName = Date.now() + ext;
    //     const fileName = `${req.userId}` + ext;
    //     cb(null, fileName);
    //   },
    // });

    // // =======

    // // =======
    // // =====1.static-multer
    // // const upload = multer({ dest: "public/avatars" });
    // const upload = multer({ storage: diskStorage });

    // // static img
    // app.use(express.static(STATIC_FILES_DIR));

    // app.post("/avatar", upload.single("avatar"), (req, res, next) => {
    //   console.log("req.file", req.file);
    //   console.log("req.files", req.files);
    //   console.log("req.body", req.body);

    //   res.send();
    // });
    // // =======

    // //=====3.JIMP
    // const Jimp = require("jimp");
    // const FsPromises = require("fs").promises;

    // const compressAvatar = async (req, res, next) => {
    //   const file = req.file;
    //   if (!file) {
    //     return next(new Error("No file detected"));
    //   }
    //   const originalFilePath = req.file.path;

    //   try {
    //     const avatar = await Jimp.read(file.path);

    //     const filePath = join(STATIC_FILES_DIR, file.filename);
    //     await avatar.resize(250, 250).quality(60).write(filePath);

    //     req.file.destination = req.file.destination.replace(
    //       ORIGINAL_FILES_DIR,
    //       STATIC_FILES_DIR
    //     );
    //     req.file.path = req.file.path.replace(
    //       ORIGINAL_FILES_DIR,
    //       STATIC_FILES_DIR
    //     );

    //     await FsPromises.unlink(originalFilePath);
    //     next();
    //   } catch (err) {
    //     next(err);
    //     await FsPromises.unlink(originalFilePath);
    //   }
    // };

    // app.post(
    //   "/avatars",
    //   upload.single("avatar"),
    //   compressAvatar,
    //   (req, res) => {
    //     console.log("req.file", req.file);
    //     res.send();
    //   }
    // );

    // // ========

    // ==================================================================

    app.use("/api/contacts", contactsRouter);
    app.use("/users", usersRouter);

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
