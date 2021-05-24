const { verifyToken } = require("../api/service/token");
const ContactDB = require("../contacts/contacts.methods");

const checkTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }

    const data = await verifyToken(token);
    req.userId = data.id;
    const userInfo = await ContactDB.findUserById(data.id);
    req.user = userInfo;

    next();
  } catch (e) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = {
  checkTokenMiddleware,
};
