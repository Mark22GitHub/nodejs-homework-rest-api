const { join } = require("path");
const Jimp = require("jimp");
const FsPromises = require("fs").promises;

const STATIC_FILES_DIR = join(__dirname, "../public/avatars");
const ORIGINAL_FILES_DIR = join(__dirname, "../tmp");

const avatarCompress = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new Error("No file detected"));
  }
  const originalFilePath = req.file.path;

  try {
    const avatar = await Jimp.read(file.path);

    const filePath = join(STATIC_FILES_DIR, file.filename);
    await avatar.resize(250, 250).quality(60).write(filePath);

    req.file.destination = req.file.destination.replace(
      ORIGINAL_FILES_DIR,
      STATIC_FILES_DIR
    );
    req.file.path = req.file.path.replace(ORIGINAL_FILES_DIR, STATIC_FILES_DIR);

    await FsPromises.unlink(originalFilePath);
    next();
  } catch (err) {
    next(err);
    await FsPromises.unlink(originalFilePath);
  }
};

module.exports = {
  avatarCompress,
};
