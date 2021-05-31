const multer = require("multer");
const { extname, join } = require("path");

const ORIGINAL_FILES_DIR = join(__dirname, "../tmp");

// =====DiskStorage======
const avatarUploadMiddleware = () => {
  const diskStorage = multer.diskStorage({
    destination: ORIGINAL_FILES_DIR,

    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const fileName = `${req.userId}` + ext;
      cb(null, fileName);
    },
  });

  return multer({ storage: diskStorage }).single("avatar");
};

module.exports = {
  avatarUploadMiddleware: avatarUploadMiddleware(),
};
