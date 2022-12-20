/*
 * @Author: Chen
 * @Email: codeeetop@qq.com
 * @Date: 2022-01-12 15:11:19
 * @LastEditTime: 2022-01-12 17:05:04
 * @Description: ...每位新修改者自己的信息
 */
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
/**
 * 可通过获取 process.env 来得到常用路径
 *  */
const { APP_HOME_DIR } = process.env

let win;
function create() {
  win = new BrowserWindow({
    icon: `${APP_HOME_DIR}\\icon.ico`,
    width: 400,
    height: 250,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // 解决跨域
    },
  })
  win.loadFile(path.resolve(APP_HOME_DIR, './index.html'))
  // win.webContents.openDevTools(); // 打开调试框
}


function handle() {
  ipcMain.on('dialog', (event, options) => {
    let all = dialog.showSaveDialogSync(options)
    event.returnValue = all
  })


  ipcMain.on('showErrorBox', (event, value) => {
    dialog.showErrorBox('提示', value);
    event.returnValue = ''
  })
}


app.on('window-all-closed', (evt) => {
  app.quit() // 显示调用quit才会退出
});

app.on("quit", () => {
  process.exit()
})

// 初始化
app.on("ready", () => {
  create()
  handle()
})
