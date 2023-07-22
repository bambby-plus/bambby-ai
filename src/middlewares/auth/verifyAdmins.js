const { verifyAdminJWT } = require("../../utils/auth");
const {
	createResponse,
	hideDevelopmentMessage,
} = require("../../helpers/responseHelper");

module.exports = async (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return createResponse(res, 401, false, "Please Login");
   }
   const token = authHeader.split(" ")[1];
   try {
      const {
         verified,
         admin_details,
      } = await verifyAdminJWT(token);

      
      if(!verified) {
         return createResponse(res, 401, false, "Unauthorized")
      }

      const { admin_id, email, role_id, role, perms, ip, country} = admin_details

      if(req.country !== country){
        return createResponse(res, 401, false, "Your access is compromised, country does not tally")
      }

      req.admin = { verified, admin_id, email, role_id, role, perms, ip, country };
      next();

   } catch (error) {
      if (error?.name === "TokenExpiredError") {
         return createResponse(res, 401, false, "Unauthorized. Token expired");
       }
       if (error?.name === "JsonWebTokenError") {
         return createResponse(res, 401, false, "Unauthorized. Invalid token format");
       }
      return createResponse(
         res,
         500,
         false,
         hideDevelopmentMessage({ message: error.message })
      );
   }
};
