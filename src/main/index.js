import { app, BrowserWindow,ipcMain, dialog, Menu } from 'electron' // eslint-disable-line
const windowStateKeeper = require('electron-window-state');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */

const POEM = require('./lib/poem');

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;


ipcMain.on('windowStatus', (event, arg) => {
  if(arg=="close") app.quit();
  else if(arg=="minimize") mainWindow.minimize();
  else mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});


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

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1000,
    frame:false
  });
  let mainWindowState = windowStateKeeper({
      defaultWidth: 1000,
      defaultHeight: 800
  });

  mainWindowState.manage(mainWindow);

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

  mainWindow.loadURL(winURL);

  const selectionMenu = Menu.buildFromTemplate([
      {accelerator: 'Ctrl+C', role: 'copy'},
      {type: 'separator'},
      {accelerator: 'Ctrl+A', role: 'selectall'},
  ])

  const inputMenu = Menu.buildFromTemplate([
      {accelerator: 'Ctrl+Z', role: 'undo'},
      {accelerator: 'Ctrl+Y', role: 'redo'},
      {type: 'separator'},
      {accelerator: 'Ctrl+X', role: 'cut'},
      {accelerator: 'Ctrl+C', role: 'copy'},
      {accelerator: 'Ctrl+V', role: 'paste'},
      {type: 'separator'},
      {accelerator: 'Ctrl+A', role: 'selectall'},
  ])

  mainWindow.webContents.on('context-menu', (e, props) => {
      const { selectionText, isEditable } = props;
      if (isEditable) {
          inputMenu.popup(mainWindow);
      } else if (selectionText && selectionText.trim() !== '') {
          selectionMenu.popup(mainWindow);
      }
  });
}

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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
