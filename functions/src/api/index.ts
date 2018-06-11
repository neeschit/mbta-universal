import * as express from 'express';

import * as cors from 'cors';

import { MbtaHttpClient } from './mbta-http.client';

const mbtaClient = new MbtaHttpClient();

export const apiExpressApp = express();

const corsApp = cors({ origin: true });

apiExpressApp.use(corsApp);

apiExpressApp.options('*', corsApp);

apiExpressApp.get('/routes', (req, res) => mbtaClient.getRoutes().then(body => res.send(body)));
apiExpressApp.get('/stops', (req, res) => mbtaClient.getStops(req.query.route).then(body => res.send(body)));

apiExpressApp.get('*', (req, res) => res.send('Hello World'));
