const { verifyJWT } = require("../../utils/auth");
const {
	createResponse,
	hideDevelopmentMessage,
} = require("../../helpers/responseHelper");

module.exports = async (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return createResponse(res, 401, false, "Please Login or Register");
   }
   const token = authHeader.split(" ")[1];
   try {
      const {
         verified,
         user_details,
      } = await verifyJWT(token);

      
      if(!verified) {
         return createResponse(res, 401, false, "Unauthorized")
      }

      const { user_id, email, country_profile_id } = user_details

      req.user = { verified, user_id, email, country_profile_id };
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
