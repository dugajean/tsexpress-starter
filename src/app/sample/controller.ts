import { Get } from '@tsexpress-starter/routes';
import logRequests from '../../middleware/log-requests';

export default class Controller {
  @Get()
  index(req: any, res: any) {
    res.send('Hello World');
  }

  @Get('/:id', logRequests)
  somePage(req: any, res: any) {
    res.send(req.params.id);
  }
}
