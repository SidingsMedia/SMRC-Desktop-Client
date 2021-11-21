// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media
// SPDX-License-Identifier: MIT

import { BrowserWindow } from "electron";
import { ipcMain } from "electron";
import * as path from "path";

const defaultProps: Electron.BrowserWindowConstructorOptions = {
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    webPreferences: {
        preload: path.join(__dirname, "../preload.js"),
        sandbox: true,
    },
    frame: process.platform === "win32" ? false : true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
        color: "#121212",
        symbolColor: "#FFFFFF",
    },
    backgroundColor: "#121212",
};

interface winProps {
    url: string;
}

// The Window class doesn't extend the BrowserWindow
// class as this isn't supported by electron. See:
// https://github.com/electron/electron/issues/23
// and
// https://github.com/electron/electron/issues/8898
/**
 * Class controlling the applications window
 */
export class Window {
    readonly win: BrowserWindow;
    readonly ctrlChannel: string = "win-ctrl";
    private windowID: number;

    /**
     * Create a new window
     * @param windowSettings - Window settings as allowed by electon BrowserWindow
     * @param windowID - The ID of the window
     */
    constructor({ url, ...windowSettings }: winProps, windowID: number) {
        // Send preloader our ID
        // This must be before the window is created else it won't be
        // ready for the initialization message
        ipcMain.handleOnce("window-initialize", async (event, ...args) => {
            return this.windowID;
        });

        this.windowID = windowID;
        this.win = new BrowserWindow({ ...defaultProps, ...windowSettings });
        this.win.loadURL(url);

        // Prevent automatic permission requests
        this.win.webContents.session.setPermissionRequestHandler(
            (webContents, permission, callback) => {
                return callback(false);
            }
        );

        // Handle IPC messages from renderer
        // Control
        ipcMain.on(`${windowID}/control/openDevTools`, (event, arg) => {
            this.openDevTools();
        });
        ipcMain.on(`${windowID}/control/closeDevTools`, (event, arg) => {
            this.closeDevTools();
        });
        ipcMain.on(`${windowID}/control/toggleDevTools`, (event, arg) => {
            this.toggleDevTools();
        });
        ipcMain.on(`${windowID}/control/close`, (event, arg) => {
            this.close();
        });
        ipcMain.on(`${windowID}/control/minimize`, (event, arg) => {
            this.minimize();
        });
        ipcMain.on(`${windowID}/control/maximize`, (event, arg) => {
            this.maximize();
        });
        ipcMain.on(`${windowID}/control/unMaximize`, (event, arg) => {
            this.unMaximize();
        });
        ipcMain.on(`${windowID}/control/toggleFullScreen`, (event, arg) => {
            this.toggleFullScreen();
        });
        // Window reload
        ipcMain.on(`${windowID}/event/beforeunload`, (event, arg) => {
            this.windowInitialize();
        });
    }

    /** Add handler for window-initialize
     *
     * Adds an ipcMain.handleOnce handler for the window-initialize channel.
     */
    private windowInitialize(): void {
        ipcMain.handleOnce("window-initialize", async (event, ...args) => {
            return this.windowID;
        });
    }

    // These methods just expose some of the common
    // webContents methods

    /**
     * Open chrome developer tools
     */
    openDevTools(): void {
        this.win.webContents.openDevTools();
    }

    /**
     * Close chrome developer tools
     */
    closeDevTools(): void {
        this.win.webContents.closeDevTools();
    }

    /**
     * Toggle chrome developer tools
     */
    toggleDevTools(): void {
        this.win.webContents.toggleDevTools();
    }

    /**
     * Are developer tools open?
     * @returns Are developer tools open
     */
    devToolsOpen(): Boolean {
        return this.win.webContents.isDevToolsOpened();
    }

    /**
     * Is the window focused?
     * @returns If the window is focused
     */
    getFocus(): Boolean {
        return this.win.isFocused();
    }

    /**
     * Close the window
     */
    close(): void {
        if (this.devToolsOpen()) {
            this.closeDevTools();
        }
        ipcMain.removeHandler("window-initialize");
        this.win.close();
    }

    /**
     * Minimizes the window
     */
    minimize(): void {
        this.win.minimize();
    }

    /**
     * Maximizes the window
     */
    maximize(): void {
        this.win.maximize();
    }

    /**
     * Unmaximize the window
     */
    unMaximize(): void {
        this.win.unmaximize();
    }

    /**
     * @returns if the window is maximized
     */
    isMaximized(): boolean {
        return this.win.isMaximized();
    }

    /**
     * Toggles between full screen mode
     */
    toggleFullScreen(): void {
        this.win.setFullScreen(!this.win.isFullScreen());
    }
}
