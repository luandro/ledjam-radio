/* eslint no-path-concat: 0, func-names:0 */
var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var Tray = require('tray');
var menu;
var trayMenu;
var template;

require('electron-debug')();
require('crash-reporter').start();

var mainWindow = null;
var appIcon = null;

// app.on('window-all-closed', function() {
//   if (process.platform !== 'darwin') app.quit();
// });


app.on('ready', function() {
  mainWindow = new BrowserWindow({ width: 1024, height: 728, 'title-bar-style': 'hidden' });
  appIcon = new Tray(path.join(__dirname, 'tray.png'));
  appIcon.setHighlightMode(true);

  if (process.env.HOT) {
    mainWindow.loadUrl('file://' + __dirname + '/app/hot-dev.html');
  } else {
    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
    appIcon = null;
  });

  mainWindow.on('close', function(e) {
    e.preventDefault();
    mainWindow.hide();
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Ledjam Radio',
      submenu: [{
        label: 'About',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide Ledjam Radio',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
          mainWindow.destroy();
          app.quit();
        }
      }]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: function() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: function() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: function() {
          mainWindow.toggleDevTools();
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }];
    trayTemplate = [{
      label: 'Launch app',
      click: function() {
        mainWindow.restore();
      }
    }, {
      type: 'separator'
    },{
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function() {
        mainWindow.destroy();
        app.quit();
      }
    }];
    menu = Menu.buildFromTemplate(template);
    trayMenu = Menu.buildFromTemplate(trayTemplate);
    Menu.setApplicationMenu(menu);
    appIcon.setContextMenu(trayMenu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: function() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: function() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: function() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click: function() {
          mainWindow.toggleDevTools();
        }
      }]
    }];
    trayTemplate = [{
      label: 'Launch app',
      click: function() {
        mainWindow.restore();
      }
    }, {
      type: 'separator'
    },{
      label: 'Quit',
      accelerator: 'Alt+F4',
      click: function() {
        mainWindow.destroy();
        app.quit();
      }
    }];
    menu = Menu.buildFromTemplate(template);
    trayMenu = Menu.buildFromTemplate(trayTemplate);
    mainWindow.setMenu(menu);
    appIcon.setContextMenu(trayMenu);

  }
});
