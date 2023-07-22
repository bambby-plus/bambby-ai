const server = require("./app")
const { PORT } = require("./config/")
const dbConnect = require("./db/dbConnectTest")
const logger = require("./helpers/logger")
const Sentry = require("@sentry/node")

const {initializeRedis} = require('./db/redis')

const port = parseInt(PORT)

const startServer = () => {
	function onListening() {
		logger(module).info(`Listening on port ${port}`)
	}

	function onError(err) {
		if (err.errno === "EADDRINUSE") {
			logger(module).error(`Port ${port} is busy`)
		} else {
			logger(module).error(`Error in starting server: ${err}`)
		}

		process.exit(1)
	}

	const serverInstance = server.listen(port, onListening)
	serverInstance.timeout = 40000

	serverInstance.on("error", onError)

	process.on("SIGTERM", () => {
		logger(module).info("SIGTERM signal received: closing HTTP server")

		serverInstance.close(() => {
			logger(module).info("HTTP server closed")
		})
	})
}

try {
	startServer()
	// dbConnect()
	// dbJobConnect()
	// initializeRedis()
} catch (error) {
	Sentry.captureException(error)
	logger(module).error(`Error in starting server: ${err?.message}`)
}
