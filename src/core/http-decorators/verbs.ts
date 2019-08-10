export interface Route {
  path: string;
  handler: Function;
  middlewares?: Function[];
}

function addRoute(
  verb: string,
  route: string,
  middlewares: Function[],
  target: any,
  descriptor: PropertyDescriptor
) {
  const currentRoutes: Route[] = target._routes ? target._routes[verb] : [];
  const newRoute: Route = {
    path: route,
    handler: descriptor.value,
    middlewares
  };

  Object.defineProperty(target, '_routes', {
    value: { [verb]: [...currentRoutes, newRoute] },
    writable: true
  });

  return descriptor;
}

export function Get(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('get', route, middlwares, target, descriptor);
  };
}

export function Post(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('post', route, middlwares, target, descriptor);
  };
}

export function Patch(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('patch', route, middlwares, target, descriptor);
  };
}

export function Put(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('put', route, middlwares, target, descriptor);
  };
}

export function Delete(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('delete', route, middlwares, target, descriptor);
  };
}
