const { NODE_ENV } = require("../config")
const logger = require("./logger")
const Sentry = require("@sentry/node")

/**
 * This is mostly used in the module's service for easy passage of response to the createResponse function.
 * @param {Boolean} status indicates if status of response is true or false; true = success response, false = failed response
 * @param {Object} data the response data
 * @param {Number} statusCode the http status code
 * @param {String} message the response message
 * @returns {Object}
 */
const internalResponse = (status, data, statusCode, message) => {
	return {
		status,
		data,
		statusCode,
		message,
	}
}

/**
 * create the response, format and send
 * @param {Express.Response} res
 * @param {Number} statusCode the http status code
 * @param {Boolean} status indicates if the response is a success or failure response
 * @param {String} message the response message
 * @param {Object} data the data to be sent over
 * @returns {Object}
 */
const createResponse = (res, statusCode, status, message, data = {}) => {
	let responseObject = {}
	if (statusCode >= 400 || statusCode < 200) {
		Sentry.captureMessage(message)
	}
	if (status) {
		responseObject = {
			status: "success",
			statusCode: statusCode,
			message: message,
			data: data,
		}
	} else {
		responseObject = {
			status: "failed",
			statusCode: statusCode,
			message: message,
		}
		if (Object.entries(data).length > 0) {
			responseObject["data"] = data
		}
	}

	if (Number(statusCode) === 500) {
		logger(module).error(JSON.stringify(responseObject))
	} else {
		logger(module).info(JSON.stringify(responseObject))
	}

	return res.status(statusCode).json(responseObject)
}

const hideDevelopmentMessage = params => {
	const { message } = params

	if (NODE_ENV === "development" || NODE_ENV === "staging") {
		return message
	} else {
		return "An unknown error occured. Try again later!"
	}
}

module.exports = {
	createResponse,
	internalResponse,
	hideDevelopmentMessage,
}
