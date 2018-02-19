import * as angularUniversal from 'angular-universal-express-firebase';

export let ssr = angularUniversal.trigger({
    index: __dirname + '/index.html',
    main: __dirname + '/dist-server/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 60,
    browserCacheExpiry: 30
});
