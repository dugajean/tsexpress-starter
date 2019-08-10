import glob from 'glob';
import path from 'path';
import dotenv from 'dotenv';
import BodyParser from 'body-parser';
import { stripSlashes, log } from './helpers';
import { Route } from './http-decorators/verbs';

export default class Application {
  /**
   * Logic to execute before routes are registered.
   *
   * @return  {Function|null}
   */
  beforeRoutes?: Function;

  /**
   * Logic to execute after routes are registered.
   *
   * @return  {Function|null}
   */
  afterRoutes?: Function;

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

    // Run before routes hooks
    if (this.beforeRoutes) {
      this.beforeRoutes.call(this, this.express);
    }

    this.locateControllers();

    // Run after routes hooks
    if (this.beforeRoutes) {
      this.beforeRoutes.call(this, this.express);
    }

    this.express.listen(process.env.APP_PORT, () => {
      log(`Server listening on port: ${process.env.APP_PORT}`);
    });
  }

  /**
   * Returns the current express instance.
   *
   * @return  {any}
   */
  get expressInstance(): any {
    return this.express;
  }

  /**
   * Locates all the controller's within the app
   *
   * @return {void}
   */
  private async locateControllers(): Promise<void> {
    const controllerPaths = glob.sync(path.join(__dirname, '../app/**/controller.ts'));

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
  private registerRoutes(routes: any[], baseRoute: string): void {
    for (const verb in routes) {
      if (routes.hasOwnProperty(verb)) {
        routes[verb].forEach((route: Route) => {
          const routePart: string = stripSlashes(route.path);
          const fullRoute: string = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;

          log(`Route: [${verb.toUpperCase()}] ${fullRoute}`);
          this.express[verb](fullRoute, ...[...(route.middlewares ? route.middlewares : []), route.handler]);
        });
      }
    }
  }
}
