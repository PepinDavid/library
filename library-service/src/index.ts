import { appConfig, createRoute } from "./core/app";
import { initializerConnector, intializerRegistries, startServer } from "./core/initializer";
import { apiRoutes } from "./routes";
import { createUsers } from "./utils/tools";

initializerConnector()
.then(() => intializerRegistries())
.then(() => createUsers())
.then(() => appConfig())
.then((app) => createRoute(app, apiRoutes))
.then((app) => startServer(app));