export default function logRequests<T>(req: T, res: T, next: any): any {
  console.log('Logging this cool request.');
  next();
}
