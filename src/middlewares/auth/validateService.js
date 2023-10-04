// core ==> games {headers: {authorization: Bearer Jwt_token, "api-service": "core" }}
// games ==> core {headers: {authorization: Bearer Jwt_token, "api-service": "games" }}
// core ==> comms {headers: {authorization: Bearer Jwt_token, "api-service": "core" }}
// commerce ==> comms {headers: {authorization: Bearer Jwt_token, "api-service": "commerce" }}
// comms ==> games {headers: {authorization: Bearer Jwt_token, "api-service": "comms" }}

const { createResponse } = require("../../helpers/responseHelper")
const {
  COMMS_JWT_SECRET_KEY,
  GAMES_JWT_SECRET_KEY,
  COMMERCE_JWT_SECRET_KEY,
  CORE_JWT_SECRET_KEY,
} = require("../../config")
const { verifyJWTForService } = require("../../utils/auth")

const validateService = async (req, res, next) => {
  try {
    const service = req.headers["api-service"]
    let token = req.headers["authorization"]

    if (!service || !token) {
      return createResponse(res, 401, false, "Unauthorized")
    }

    const services = ["comms", "core", "commerce"]

    if (!services.includes(service.toLowerCase())) {
      return createResponse(res, 401, false, "Unauthorized")
    }

    //separate the Bearer from the string if it exists
    const separateBearer = token.split(" ")
    if (separateBearer.includes("Bearer")) {
      token = separateBearer[1]
    } else {
      token = authHeader
    }

    let result

    //decode
    switch (service.toLowerCase()) {
      case services[0]:
        result = await verifyJWTForService(token, COMMS_JWT_SECRET_KEY)
        break
      case services[1]:
        result = await verifyJWTForService(token, CORE_JWT_SECRET_KEY)
        break
      case services[2]:
        result = await verifyJWTForService(token, COMMERCE_JWT_SECRET_KEY)
        break
      default:
        result = null
    }

    const { ip_address } = result

    //TODO: check if the ip address is allowed from the database e.g
    // games_service => 100.000.1
    //if its correct => connect the service
    if (ip_address) {
      next()
    } else {
      return createResponse(res, 403, false, "Unauthorized. Invalid token")
    }
  } catch (err) {
    console.log(err)
    switch (err?.name) {
      case "JsonWebTokenError":
        return createResponse(res, 403, false, "Unauthorized. Invalid token!")
      case "TokenExpiredError":
        return createResponse(res, 403, false, "Unauthorized. Expired token!")
      default:
        return createResponse(res, 401, false, err.name)
    }
  }
}

module.exports = validateService
