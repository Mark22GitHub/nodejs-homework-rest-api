const multer = require("multer");
const { extname, join } = require("path");

const STATIC_FILES_DIR = join(__dirname, "../public/avatars");
// const STATIC_FILES_DIR = join(__dirname, "../public");
const ORIGINAL_FILES_DIR = join(__dirname, "../tmp");

// const path = require("path");
// const uploadDir = path.join(process.cwd(), "public", "avatars");

// =====2.DiskStorage
// const path = require("path");
// const { extname, join } = require("path");

const avatarUploaderMiddleware = () => {
  const diskStorage = multer.diskStorage({
    destination: ORIGINAL_FILES_DIR,
    // destination: STATIC_FILES_DIR,

    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      // const fileName = Date.now() + ext;
      // const fileName = file.filename + ext;
      const fileName = `${req.userId}` + ext;
      cb(null, fileName);
    },
  });
  // =======
  // const upload = multer({ storage: diskStorage });
  // return upload.single("avatar");

  return multer({ storage: diskStorage }).single("avatar");
};

module.exports = {
  avatarUploaderMiddleware: avatarUploaderMiddleware(),
};
