"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const angularUniversal = require("angular-universal-express-firebase");
exports.ssr = angularUniversal.trigger({
    index: __dirname + '/index.html',
    main: __dirname + '/dist-server/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 60,
    browserCacheExpiry: 30
});
//# sourceMappingURL=index.js.map