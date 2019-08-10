import glob from 'glob';
import path from 'path';
import dotenv from 'dotenv';
import { Route } from './verbs';
import BodyParser from 'body-parser';

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
    this.express.listen(process.env.APP_PORT);
  }

  /**
   * Locates all the controller's within the app
   *
   * @return {void}
   */
  locateControllers(): void {
    const controllerPaths = glob.sync(
      path.join(__dirname, '../app/**/controller.ts')
    );

    this.express.use(async (req: any, res: any, next: any) => {
      let baseRoute;
      let controller;

      for (const controllerPath of controllerPaths) {
        baseRoute = path.basename(path.dirname(controllerPath));
        controller = await import(controllerPath);
        controller = new controller.default();

        this.registerRoutes(controller._routes, baseRoute, req, res);
      }

      next();
    });
  }

  /**
   * Registers all routes with the express app.
   *
   * @param {any}    routes    The list of routes to register
   * @param {string} baseRoute The base of the domain, ie. "tasks"
   * @param {any}    req       Express's request object
   * @param {any}    res       Express's response handler
   *
   * @return {void}
   */
  registerRoutes(routes: any, baseRoute: string, req: any, res: any): void {
    for (const verb in routes) {
      routes[verb].forEach((route: Route) => {
        this.express[verb](
          `/${baseRoute}/${this.stripSlashes(route.path)}`,
          route.handler
        );
      });
    }
  }

  /**
   * Trims slashes from a path.
   *
   * @param {string} path
   *
   * @return {string}
   */
  private stripSlashes(path: string): string {
    if (path.endsWith('/')) path = path.slice(0, -1);
    if (path.startsWith('/')) path = path.substring(1);

    return path;
  }
}
