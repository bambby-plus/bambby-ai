const express = require("express")
const session = require('express-session')
const rtracer = require("cls-rtracer")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const { isCelebrateError } = require("celebrate")
const path = require("path")
const { createResponse } = require("./helpers/responseHelper")
const appRoutes = require("./routes")


const app = express()

app.use(session({
	secret: 'your-secret-key', // Replace with a secret key for session encryption
	resave: false,
	saveUninitialized: false
}));
  
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const tracer = require('dd-trace').init({
	logInjection: true
});


//global middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rtracer.expressMiddleware()) //to add request ids to logs

//morgan logging
const morganFormat =
	'[:requestId] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
//app.use(morgan(morganFormat, { stream: accessLogStream })) // to file
app.use(morgan(morganFormat)) //to output stream logss to the console
morgan.token("requestId", () => rtracer.id())

app.use(helmet())
app.use(cors())

app.get("/healthcheck", (_, res) => {
	return res.status(200).json({
		status: "success",
		statusCode: 200,
		message: "Bambby service is up and running",
	})
})

app.get("/", (req, res) => {
	console.log('here')
	res.render('home', { title: 'Welcome to Bambby' });
});

//api routes
appRoutes(app)

//not found middleware
app.use((_, res) => {
	createResponse(res, 404, false, "Endpoint not found")
})

app.use((error, _, res, next) => {
	if (isCelebrateError(error)) {
		const errorMessage =
			error.details.get("body") ||
			error.details.get("query") ||
			error.details.get("params")
		const message = errorMessage?.message.replace(/"/g, "")
		return createResponse(res, 422, false, message)
	}
	next()
})

module.exports = app
