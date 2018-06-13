import * as angularUniversal from 'angular-universal-express-firebase';
import { apiExpressApp } from './api';
import { https } from 'firebase-functions';

export let ssr = angularUniversal.trigger({
    index: __dirname + '/index.html',
    main: __dirname + '/dist-server/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 60 * 24 * 7,
    browserCacheExpiry: 30
});

export let api = https.onRequest(apiExpressApp);
