import glob from 'glob';
import path from 'path';

export default class Application {
  constructor(private express: any) {}

  start(): void {
    const controllerPaths = glob.sync(
      path.join(__dirname, '../app/**/controller.ts')
    );

    this.express.use(async (req: any, res: any, next: any) => {
      let controller;
      for (const path of controllerPaths) {
        controller = await import(path);
        controller = new controller.default();

        this.registerRoutes(controller._routes, req, res);
      }

      next();
    });

    this.express.listen(3000);
  }

  registerRoutes(routes: any, req: any, res: any): void {
    for (const verb in routes) {
      for (const route of routes[verb]) {
        this.express[verb](route.path, route.handler);
      }
    }
  }
}
