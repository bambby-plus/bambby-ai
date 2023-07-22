const chatRouter = require("./api/v1/chat/chat.controller");
const gamesRouter = require("./api/v1/games/games.controller");
const marketplaceRouter = require("./api/v1/marketplace/marketplace.controller");
const medicalsRouter = require("./api/v1/medicals/medicals.controller");

const { checkLocale } = require("./middlewares");

const apiPrefix = "/ai/:country/:version";

const routes = [
  {
    prefix: "games",
    name: gamesRouter,
  },
  {
    prefix: "chat",
    name: chatRouter,
  },
  {
    prefix: "marketplace",
    name: marketplaceRouter,
  },
  {
    prefix: "medicals",
    name: medicalsRouter,
  },
];

/**
 * A function that helps in setting the global middleware for routes
 * @param {Express.Application} app
 */
module.exports = (app) => {
  routes.forEach((route) => {
    app.use(`${apiPrefix}/${route.prefix}`, /*checkLocale,*/ route.name);
  });
};
