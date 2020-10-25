import * as http from 'http';
import * as express from 'express';
import * as expressValidator from 'express-validator';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
  method: HttpMethod;
  route: string;
  action: express.RequestHandler;
}

export interface HttpServerOptions {
  routes: Route[],
  port: number,
}

const requestLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.info(`Receiving ${req.method} request ${req.path}`);
  next();
};

export async function createHttpServer(options: HttpServerOptions): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use(expressValidator());
  options.routes.forEach(r => {
    const { method, route, action } = r;
    app[method](route, [
      requestLogger,
      action,
    ]);
  });

  const server = http.createServer(app);
  server.listen(options.port);

  return new Promise((resolve, reject) => {
      server.once('listening', () => {
        console.log(`Http server is running on http://localhost:${options.port}`);
        resolve();
      });
      server.once('error', err => reject(err));
  });
}
