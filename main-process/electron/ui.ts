// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media
// SPDX-License-Identifier: MIT

import { app, protocol, BrowserWindow } from "electron";
import { EventEmitter } from "events";
import { Window } from "./base/Window";
import * as path from "path";
import * as url from "url";

export class UI extends EventEmitter {
    private windows: Array<Window>;

    constructor() {
        super();
        this.windows = [];

        app.whenReady().then(() => {
            this.createWindow("index.html");
            this.setupLocalFilesNormalizerProxy();

            app.on("activate", this.activate);
        });

        // Quit when all windows are closed unless we are running
        // macOS
        app.on("window-all-closed", this.windowsAllClosed);

        // Disable navigation as it is not needed
        app.on("web-contents-created", (event, contents) => {
            contents.on("will-navigate", (event, navigationURL) => {
                event.preventDefault();
            });
        });
    }

    /** Create a window
     * @param firstFile - The filename with file extension of the HTML
     * file in the parent repository to be loaded.
     *
     * @emits window-created
     */
    createWindow(firstFile: String): void {
        // Make sure to get compiled React files from correct place
        const appURL = app.isPackaged
            ? `file://${path.join(__dirname, `../${firstFile}`)}`
            : `http://localhost:3000/${firstFile}`;
        console.log(appURL);
        let length = this.windows.length;
        this.windows.push(new Window({ url: appURL }, length));
        let index = length;
        // Open dev tools if in dev
        if (!app.isPackaged) {
            this.windows[index].openDevTools();
        }
        this.emit("window-created", length);
    }

    /** Closes a window with the given ID
     *
     * @param windowID - The ID of the window to close
     */
    closeWindow(windowID: number): void {
        this.windows[windowID].close();
    }

    /** Quit
     *
     * Makes sure that everything is ready for quit and then quits the
     * app.
     *
     * @emits will-quit
     */
    private quit(): void {
        this.emit("will-quit");
        app.quit();
    }

    /** Called when the activate event is emmited by app
     *
     * All that this does is check if any windows already exist and if
     * none exist creates a new main window.
     */
    private activate(): void {
        // macOS expects that a new window is created if
        // the doc icon is clicked
        if (BrowserWindow.getAllWindows().length === 0) {
            this.createWindow("index.html");
        }
    }

    /** Called when the windows-all-closed event is emmitted by app
     *
     * If we are on darwin then nothing happens else the app exits.
     */
    private windowsAllClosed(): void {
        if (process.platform !== "darwin") {
            this.quit();
        }
    }

    /**
     * Local proxy to adjust paths of files when loaded from
     * production bundle
     */
    private setupLocalFilesNormalizerProxy(): void {
        protocol.registerHttpProtocol("file", (request, callback) => {
            const url = request.url.substr(8);
            callback({ path: path.normalize(`${__dirname}/${url}`) });
        });
    }
}



