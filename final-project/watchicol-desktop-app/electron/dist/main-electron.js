"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = __importStar(require("path"));
var url = __importStar(require("url"));
var win;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    var ses = win.webContents.session;
    ses.clearCache(function () {
        alert('Cache cleared!');
    });
    ses.clearStorageData();
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/watchicol-web-front-end/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    win.webContents.openDevTools();
    win.on('closed', function () {
    });
}
//# sourceMappingURL=main-electron.js.map