export interface Route {
  path: string;
  handler: Function;
}

function addRoute(
  verb: string,
  route: string,
  target: any,
  descriptor: PropertyDescriptor
) {
  const currentRoutes: Route[] = target._routes ? target._routes[verb] : [];
  const newRoute: Route = { path: route, handler: descriptor.value };

  Object.defineProperty(target, '_routes', {
    value: {
      [verb]: [...currentRoutes, newRoute]
    },
    writable: true
  });

  return descriptor;
}

export function Get(route: string = '') {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    return addRoute('get', route, target, descriptor);
  };
}

export function Post(route: string = '') {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    return addRoute('post', route, target, descriptor);
  };
}

export function Patch(route: string = '') {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    return addRoute('patch', route, target, descriptor);
  };
}

export function Put(route: string = '') {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    return addRoute('put', route, target, descriptor);
  };
}

export function Delete(route: string = '') {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    return addRoute('delete', route, target, descriptor);
  };
}
