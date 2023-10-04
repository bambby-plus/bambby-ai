const db = require("./")
const logger = require("../helpers/logger")
const Sentry = require("@sentry/node")

module.exports = async () => {
	try {
		await db.sequelize.authenticate()
		await db.sequelize.sync()
		logger(module).info(
			"Connection to database has been established successfully!"
		)
	} catch (error) {
		Sentry.captureException(error)
		logger(module).error(
			`An error occurred while trying to connect to the database, ${error}`
		)
	}
}
