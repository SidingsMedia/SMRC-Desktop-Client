// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media
// SPDX-License-Identifier: MIT

import { BrowserWindow } from "electron";
import { ipcMain } from "electron/main";
import * as path from "path";

type titleBarStyle =
    | "hidden"
    | "default"
    | "hiddenInset"
    | "customButtonsOnHover"
    | undefined;
type webPreferencesProps = {
    preload: string;
    sandbox: boolean;
};
type props = {
    width: number;
    minWidth: number;
    height: number;
    minHeight: number;
    webPreferences: webPreferencesProps;
    frame: boolean;
    titleBarStyle: titleBarStyle;
    backgroundColor: string;
};
const defaultProps: props = {
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

    /**
     * Create a new window
     * @param {Object} windowSettings - Window settings as allowed by electon BrowserWindow
     * @param {String} ctrlChannel - The channel for window control calls to be made on
     */
    constructor({ url, ...windowSettings }: winProps, ctrlChannel: string) {
        this.ctrlChannel = ctrlChannel;
        this.win = new BrowserWindow({ ...defaultProps, ...windowSettings });
        // Inform renderer of current blur status
        this.win.on("focus", () => {
            this.alertFocus();
        });
        this.win.on("blur", () => {
            this.alertBlur();
        });
        // BUG: Electron doesn't emit these events on linux
        // see https://github.com/electron/electron/issues/28699
        // Inform renderer of current maximize status
        this.win.on("maximize", () => {
            this.alertMaximize();
        });
        this.win.on("unmaximize", () => {
            this.alertUnMaximize();
        });
        this.win.loadURL(url);

        // Prevent automatic permission requests
        this.win.webContents.session.setPermissionRequestHandler(
            (webContents, permission, callback) => {
                return callback(false);
            }
        );

        // Handle window control messages
        ipcMain.on(this.ctrlChannel, (event, arg) => {
            switch (arg) {
                case "openDevTools":
                    this.openDevTools();
                    break;
                case "closeDevTools":
                    this.closeDevTools();
                    break;
                case "toggleDevTools":
                    this.toggleDevTools();
                    break;
                case "devToolsOpen":
                    event.reply(this.ctrlChannel, {
                        type: "devToolsOpen",
                        value: this.devToolsOpen(),
                    });
                    break;
                case "getFocus":
                    event.reply(this.ctrlChannel, {
                        type: "getFocus",
                        value: this.getFocus(),
                    });
                    break;
                case "close":
                    this.close();
                    break;
                case "minimize":
                    this.minimize();
                    break;
                case "maximize":
                    this.maximize();
                    break;
                case "unMaximize":
                    this.unMaximize();
                    break;
                case "toggleFullScreen":
                    this.toggleFullScreen();
                    break;
                default:
                    event.reply(ctrlChannel, {
                        type: "error",
                        value: "noMethod",
                    });
                    break;
            }
        });

        // These must be created after IPC handlers have been declared
        // else the IPC may be called and no handler ready to reply
    }

    // Basic window controls

    /**
     * Sends a message to the render proccess informing
     * it that the window is now in focus
     */
    private alertFocus(): void {
        this.win.webContents.send(this.ctrlChannel, {
            type: "focus",
            value: "focus",
        });
    }

    /**
     * Sends a message to the render proccess informing
     * it that the window is no longer in focus
     */
    private alertBlur(): void {
        this.win.webContents.send(this.ctrlChannel, {
            type: "focus",
            value: "blur",
        });
    }

    /**
     * Sends a message to the render proccess saying that
     * the window has been maximizes and it should change
     * the titlebar icon
     */
    private alertMaximize(): void {
        this.win.webContents.send(this.ctrlChannel, {
            type: "maximize",
            value: true,
        });
    }

    /**
     * Sends a message to the render proccess saying that
     * the window has been unmaximized and it should change
     * the titlebar icon
     */
    private alertUnMaximize(): void {
        this.win.webContents.send(this.ctrlChannel, {
            type: "maximize",
            value: false,
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
     * @returns {Boolean} Are developer tools open
     */
    devToolsOpen(): Boolean {
        return this.win.webContents.isDevToolsOpened();
    }

    /**
     * Is the window focused?
     * @returns {Boolean} If the window is focused
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
        this.win.emit("maximize");
    }

    /**
     * Unmaximize the window
     */
    unMaximize(): void {
        this.win.unmaximize();
        this.win.emit("unmaximize");
    }

    /**
     * Returns if the window is maximized
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
