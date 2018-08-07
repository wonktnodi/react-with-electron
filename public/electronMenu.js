const { app, Menu, shell } = require('electron');  // eslint-disable-line

class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment();
    }

    const template = process.platform === 'darwin' ? this.buildDarwinTemplate() : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          },
        },
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'Dashboard',
      submenu: [
        { label: '关于', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: '隐藏其他应用', accelerator: 'Command+Shift+H', selector: 'hideOtherApplications:' },
        { label: '显示所有应用', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit = {
      label: '修改',
      submenu: [
        { label: '撤销', accelerator: 'Command+Z', selector: 'undo:' },
        { label: '重做', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: '剪切', accelerator: 'Command+X', selector: 'cut:' },
        { label: '复制', accelerator: 'Command+C', selector: 'copy:' },
        { label: '粘贴', accelerator: 'Command+V', selector: 'paste:' },
        { label: '全选', accelerator: 'Command+A', selector: 'selectAll:' },
      ],
    };
    const subMenuViewDev = {
      label: '视图',
      submenu: [
        {
          label: '重新加载',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: '全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: '打开开发者工具',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd = {
      label: '视图',
      submenu: [
        {
          label: '全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow = {
      label: '窗口',
      role: 'window',
      submenu: [
        { label: '最小化', accelerator: 'Command+M', selector: 'performMiniaturize:' },
        { label: '关闭', accelerator: 'Command+W', selector: 'performClose:' },
      ],
    };
    const subMenuHelp = {
      label: '帮助',
      submenu: [
        {
          label: '更多',
          click() {
            shell.openExternal('https://www.imagicstone.com/');
          },
        },
      ],
    };

    const subMenuView = process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&文件',
        submenu: [
          {
            label: '&打开',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&关闭',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&视图',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
              {
                label: '&重新加载',
                accelerator: 'Ctrl+R',
                click: () => {
                  this.mainWindow.webContents.reload();
                },
              },
              {
                label: '&全屏',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                },
              },
              {
                label: '&打开开发者工具',
                accelerator: 'Alt+Ctrl+I',
                click: () => {
                  this.mainWindow.toggleDevTools();
                },
              },
            ]
            : [
              {
                label: '&全屏',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                },
              },
            ],
      },
      {
        label: '帮助',
        submenu: [
          {
            label: '更多',
            click() {
              shell.openExternal('https://www.imagicstone.com/');
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}

exports.MenuBuilder = MenuBuilder;
