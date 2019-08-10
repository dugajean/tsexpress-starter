import glob from 'glob';
import path from 'path';
import dotenv from 'dotenv';
import { Route } from './verbs';
import BodyParser from 'body-parser';
import { stripSlashes, log } from './helpers';

export default class Application {
  /**
   * Application constructor.
   *
   * @param {any} express An Express app instance.
   */
  constructor(private express: any) {}

  /**
   * Start the application and listen to a port.
   *
   * @return {void}
   */
  start(): void {
    dotenv.config();

    this.express.use(BodyParser.urlencoded({ extended: true }));
    this.express.use(BodyParser.json());

    this.locateControllers();

    this.express.listen(process.env.APP_PORT, () => {
      log(`Server listening on port: ${process.env.APP_PORT}`);
    });
  }

  /**
   * Locates all the controller's within the app
   *
   * @return {void}
   */
  async locateControllers(): Promise<void> {
    const controllerPaths = glob.sync(
      path.join(__dirname, '../app/**/controller.ts')
    );

    let baseRoute;
    let controller;

    for (const controllerPath of controllerPaths) {
      baseRoute = path.basename(path.dirname(controllerPath));
      controller = await import(controllerPath);
      controller = new controller.default();

      log(`Registering routes for ${baseRoute} controller:`);
      this.registerRoutes(controller._routes, baseRoute);
    }
  }

  /**
   * Registers all routes with the express app.
   *
   * @param {any}    routes     The list of routes to register
   * @param {string} baseRoute  The base of the domain, ie. "tasks"
   * @param {any}    req        Express's request object
   * @param {any}    res        Express's response handler
   *
   * @return {void}
   */
  registerRoutes(routes: any, baseRoute: string): void {
    for (const verb in routes) {
      routes[verb].forEach((route: Route) => {
        const path = stripSlashes(route.path);

        log(
          `Route: [${verb.toUpperCase()}] /${baseRoute}${
            path ? '/' : ''
          }${stripSlashes(route.path)}`
        );

        this.express[verb](
          `/${baseRoute}${path ? '/' : ''}${path}`,
          route.handler
        );
      });
    }
  }
}
