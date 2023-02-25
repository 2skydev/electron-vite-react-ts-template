import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';

import { join } from 'path';

import { globImport } from './utils/import';

export type AppContextType = InstanceType<typeof AppContext>;
export type ModuleFunction = (context: AppContextType) => void | Promise<void>;

const { productName, protocols } = require(app.isPackaged
  ? './app.json'
  : '../electron-builder.json');

class AppContext {
  // deep link protocol
  readonly PROTOCOL = protocols.name;

  // is mac os
  readonly IS_MAC = process.platform === 'darwin';

  // dev mode - url
  readonly DEV_URL = `http://localhost:3000/#`;

  // production mode - load file
  readonly PROD_LOAD_FILE_PATH = join(__dirname, '../dist/index.html');
  readonly PROD_LOAD_FILE_HASH = '#';

  // resources directory
  readonly RESOURCES_PATH = app.isPackaged
    ? join(process.resourcesPath, 'resources')
    : join(app.getAppPath(), 'resources');

  // native icon
  readonly ICON = nativeImage.createFromPath(
    `${this.RESOURCES_PATH}/icons/${this.IS_MAC ? 'logo@512.png' : 'logo@256.ico'}`,
  );

  // electron window
  window: BrowserWindow | null = null;

  async bootstrap() {
    await this.initliazeElectron();
    await this.autoload();
    await this.createWindow();
  }

  async initliazeElectron() {
    const gotTheLock = app.requestSingleInstanceLock();

    if (!gotTheLock) {
      app.quit();
      process.exit(0);
    }

    app.setAsDefaultProtocolClient(this.PROTOCOL);

    app.on('activate', () => {
      this.createWindow();
    });

    app.on('window-all-closed', () => {
      this.window = null;
    });

    await app.whenReady();
    await this.createTray();
  }

  // create electron window
  async createWindow() {
    if (this.window) {
      if (this.window.isMinimized()) this.window.restore();
      this.window.focus();
      return;
    }

    this.window = new BrowserWindow({
      width: 1800,
      height: 1000,
      backgroundColor: '#36393F',
      darkTheme: true,
      show: false,
      autoHideMenuBar: true,
      frame: false,
      icon: this.ICON,
      webPreferences: {
        preload: join(__dirname, 'preload/index.js'),
      },
    });

    if (app.isPackaged) {
      this.window.loadFile(this.PROD_LOAD_FILE_PATH, {
        hash: this.PROD_LOAD_FILE_HASH,
      });
    } else {
      await this.window.loadURL(this.DEV_URL);
      this.window.webContents.openDevTools();
    }

    this.window.on('ready-to-show', () => {
      this.window?.show();
    });
  }

  async createTray() {
    let tray = new Tray(this.ICON.resize({ width: 20, height: 20 }));

    const contextMenu = Menu.buildFromTemplate([
      { label: 'view app screen', type: 'normal', click: () => this.createWindow() },
      { type: 'separator' },
      { label: 'quit', role: 'quit', type: 'normal' },
    ]);

    tray.on('double-click', () => this.createWindow());
    tray.setToolTip(productName);
    tray.setContextMenu(contextMenu);
  }

  async register(module: ModuleFunction) {
    await module(this);
  }

  async autoload() {
    const modules = await globImport('./modules/**/index.js', { cwd: __dirname });

    await Promise.all(modules.map(({ default: module }) => this.register(module)));
  }
}

export default AppContext;
