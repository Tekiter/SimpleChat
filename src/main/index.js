import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let chatServer = new Object()
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
  
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    show: false,
    width: 1000,
    webPreferences: {
      "nodeIntegration": true,
      nativeWindowOpen: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.show()
    
    mainWindow = new BrowserWindow({
      height: 563,
      useContentSize: true,
      show: false,
      width: 1000,
      webPreferences: {
        "nodeIntegration": true,
        nativeWindowOpen: true
      }
    })
  
    mainWindow.loadURL(winURL)
  
    mainWindow.on('closed', () => {
      mainWindow = null
      if (chatServer.io) {

        chatServer.io.close()
      }
    })
  
    mainWindow.once('ready-to-show', () => {
      mainWindow.setMenu(null)
      mainWindow.show()
      
  
    })
  })
}

app.on('ready', createWindow)
// app.on('ready', () => {createWindow();createWindow();})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})



ipcMain.on('ServerCreate', function (evt, arg) {

  if (chatServer.io) {
    return
  }


  const expapp = require('express')()
  const http = require('http').createServer(expapp)
  
  // expapp.get('/', (req, res) => {
  //   res.send('asdfasdfasdfsdf')
  // })

  const io = require('socket.io')(http)

  http.listen(arg['port'], () => {
    console.log('server ' + arg['port'] + ' created')
  })


  chatServer.io = io
  chatServer.port = arg['port']
  chatServer.users = {}


  io.on('connection', (socket) => {
    console.log('User connecting...')

    socket.on('join', (header) => {
      if (header.nickname) {
        let user = {
          nickname: header.nickname,
          ip: socket.handshake.address.address,
          port: socket.handshake.address.port
        }
        chatServer.users[socket.id] = user
        
        socket.emit('joined', header.nickname)
        
        console.log('User Joined! : ' + header.nickname)

      }
    })

    socket.on('chat', (msg) => {
      console.log(msg)
      io.emit('chat', {
        data: msg, 
        nickname: chatServer.users[socket.id].nickname, 
        ip: chatServer.users[socket.id].ip
      })
    })

  })

})


// const appp = require('express')();
// const http = require('http').createServer(appp);
// const io = require('socket.io')(http);
// appp.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
// http.listen(3001, () => {
//   console.log('Connected at 3001'); // http의 http 소켓 연결
// });
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