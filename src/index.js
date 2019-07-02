import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { stringify } from 'querystring';
const windowStateKeeper = require('electron-window-state');
const POEM = require('njuptaaa-poem');

ipcMain.on('windowStatus', (event, arg) => {
    if(arg=="close") app.quit();
    else if(arg=="minimize") mainWindow.minimize();
    else mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

ipcMain.on('parse', (event) => {
    dialog.showOpenDialog({ 
        title: 'Select POEM / Poetry',
        filters: [
            {name:'All Files', extensions: ['poem','poetry']},
            {name:'POEM', extensions: ['poem']},
            {name:'Poetry', extensions: ['poetry']}
        ],
        properties: ['openFile']
    },(filePaths)=>{
        if(filePaths){
            let filePath=filePaths[0];
            POEM.parse(filePath,"auto",(ret)=>{
                mainWindow.webContents.send('parseComplete', ret);
            });
        }
    });
});

const createWindow = () => {

    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth:1000,
        minHeight:600,
        frame: false,
        show: false,
        title: "POET"
    });

    mainWindowState.manage(mainWindow);

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('windowStatusChange', 'maximize');
    });

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('windowStatusChange', 'unmaximize');
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.webContents.send('windowStatusChange', mainWindow.isMaximized()?'maximize':'unmaximize');
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});