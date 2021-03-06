// Modules to control application life and create native browser window
const {app, BrowserWindow, nativeImage, globalShortcut, systemPreferences, ipcMain} = require('electron')
const spotify = require('spotify-node-applescript');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const keys ={
  next: 'MediaNextTrack',
  previous: 'MediaPreviousTrack',
  playPause: 'MediaPlayPause'
}

systemPreferences.isTrustedAccessibilityClient(true)

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    titleBarStyle: 'customButtonsOnHover', frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.setAspectRatio(1)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

    for(const key in keys){
      globalShortcut.register(keys[key], () => {
        //console.log(key+' is pressed')
        spotify[key]()
      })
      //console.log(globalShortcut.isRegistered(keys[key]))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('coverURI', (event, arg) => {
  app.dock.setIcon(nativeImage.createFromDataURL(arg))
})
