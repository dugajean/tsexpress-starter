export default function logRequests(req: any, res: any, next: any) {
  console.log('Logging this cool request.');
  next();
}
