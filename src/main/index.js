import { app, BrowserWindow, ipcMain } from 'electron'
import { UserList } from './user'

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

function createWindow() {
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



ipcMain.on('ServerCreate', (evt, arg) => {

  if (chatServer.io) {
    chatServer.io.close()
  }


  const expapp = require('express')()
  const http = require('http').createServer(expapp)
  const io = require('socket.io')(http)

  http.listen(arg['port'], '0.0.0.0')

  
  chatServer.io = io
  chatServer.port = arg['port']
  chatServer.users = new UserList()
  chatServer.logCount = 1
  chatServer.sendLog = function (msg, type='info') {
    evt.sender.send('ServerLog', {
      seq: chatServer.logCount++,
      type: type,
      msg: msg,
    })
  }
  
  chatServer.sendLog('Server started from port ' + chatServer.port)

  io.on('connection', (socket) => {
    chatServer.sendLog('User connecting...')


    socket.on('disconnect', function(){
      let user = chatServer.users.get(socket.id)
      if (user) {
        
        console.log('User disconnected : ' + user.nickname);
        chatServer.sendLog('User disconnected : ' + user.nickname, 'disconnect')
      }
    });

    socket.on('join', (header) => {
      if (header.nickname) {

        chatServer.users.register(socket.id, header.nickname, socket.handshake.address)

        io.emit('joined', { nickname: header.nickname })
        

        // console.log('User Joined : ' + header.nickname + ' from ' + socket.handshake.address)
        chatServer.sendLog('User Joined : ' + header.nickname + ' from ' + socket.handshake.address, 'join')

      } 
    })

    socket.on('chat', (msg) => {
      console.log(msg)
      let user = chatServer.users.get(socket.id)
      if (user) {
        chatServer.sendLog(user.nickname + ': ' + msg)
        io.emit('chat', { 
          data: msg,
          nickname: user.nickname,
          ip: user.ip
        })
        
      }
    })

    socket.on('userlist', (options) => {
      let user = chatServer.users.get(socket.id)
      // if (user) {
        socket.emit('userlist', chatServer.users.getUsers())
      // }
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