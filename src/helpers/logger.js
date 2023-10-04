const { createLogger, format, transports } = require("winston")
const rTracer = require("cls-rtracer")
const fs = require("fs")
const path = require("path")

const { combine, timestamp, label, printf } = format

const getLogLabel = (callingModule) => {
  const parts = callingModule.filename.split(path.sep)
  return path.join(parts[parts.length - 2], parts.pop())
}

const formatDate = () => {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return `${year}${month}${day}`
}

const getFile = (type) => {
  const d = formatDate()
  const filename = `logs/${d}${type}.log`
  fs.open(filename, "r", function (err, fd) {
    if (err) {
      fs.writeFile(filename, "", function (err) {
        if (err) {
          return `logs/${type}.log`
        }
        return filename
      })
    } else {
      return filename
    }
  })
  return filename
}

/**
 * Creates a Winston logger object. 
 * ### Log Format
 * *| timestamp | request-id | module/filename | log level | log message |*
 *
 * @param {Module} callingModule the module from which the logger is called
 */
const logger = (callingModule) =>
  createLogger({
    format: combine(
      label({ label: getLogLabel(callingModule) }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      printf((info) => {
        const rid = rTracer.id()

        return rid
          ? `| ${info.timestamp} | ${rid} | ${info.label} | ${info.level} | ${info.message} |`
          : `| ${info.timestamp} | ${info.label} | ${info.level} | ${info.message} |`
      })
    ),
    transports: [
      new transports.Console(),
      //new transports.File({ filename: getFile("info"), level: "info" }),
      //new transports.File({ filename: getFile("error"), level: "error" }),
    ],
    exitOnError: false,
  })

module.exports = logger
