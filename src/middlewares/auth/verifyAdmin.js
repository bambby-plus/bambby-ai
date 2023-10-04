const { verifyJWT } = require("../../utils/auth");
const  { ADMIN_KEY } = require("../../config/")
const {
   createResponse,
   hideDevelopmentMessage,
} = require("../../helpers/responseHelper");

module.exports = async (req, res, next) => {
   const authHeader = req.headers['x-admin-key'];

   try {
    //TODO: add admin and verify token with IP whitelisting

    if(authHeader !== ADMIN_KEY) {
     return createResponse(res, 401, false, "Unauthorized")
    }

      req.admin = { admin: "mynameisadmin"};
      next();
   } catch (error) {
      if (error?.name === "TokenExpiredError") {
         return createResponse(res, 401, false, "Unauthorized. Token expired");
       }
       if (error?.name === "JsonWebTokenError") {
         return errorResponse(res, 401, false, "Unauthorized. Invalid token format");
       }
      return createResponse(
         res,
         500,
         false,
         hideDevelopmentMessage({ message: error.message })
      );
   }
};