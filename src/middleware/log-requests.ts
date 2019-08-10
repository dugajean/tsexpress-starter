export default function logRequests(req: any, res: any, next: any) {
  console.log('Test middlware');
  next();
}
