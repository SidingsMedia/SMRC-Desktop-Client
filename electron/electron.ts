// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media
// SPDX-License-Identifier: MIT

import { app, protocol, BrowserWindow, session, webContents } from "electron";
import { Window } from "./base/Window";
import { request } from "http";
import * as path from "path";
import * as url from "url";

// class Window extends BrowserWindow {
//     constructor(ctrlChannel: string) {
//         super({
//             width: 800,
//             minWidth: 800,
//             height: 600,
//             minHeight: 600,
//             webPreferences: {
//                 preload: path.join(__dirname, "preload.js"),
//                 sandbox: true,
//             },
//             frame: false,
//             backgroundColor: "#121212",
//         });

//         const appURL = app.isPackaged
//             ? url.format({
//                   pathname: path.join(__dirname, "../index.html"),
//                   protocol: "file",
//                   slashes: true,
//               })
//             : "http://localhost:3000";
//         console.log(appURL);
//         this.loadURL(appURL);

//         // Open dev tools if in dev
//         if (!app.isPackaged) {
//             this.webContents.openDevTools();
//         }

// Local proxy to adjust paths of files when loaded from
// production bundle
function setupLocalFilesNormalizerProxy(): void {
    protocol.registerHttpProtocol("file", (request, callback) => {
        const url = request.url.substr(8);
        callback({ path: path.normalize(`${__dirname}/${url}`) });
    });
}

var mainWin: Window;

app.whenReady().then(() => {
    console.log("ready");
    const appURL = app.isPackaged
        ? url.format({
              pathname: path.join(__dirname, "../index.html"),
              protocol: "file",
              slashes: true,
          })
        : "http://localhost:3000";
    mainWin = new Window({ url: appURL }, "win-ctrl-main");
    // Open dev tools if in dev
    if (!app.isPackaged) {
        mainWin.openDevTools();
    }
    setupLocalFilesNormalizerProxy();

    app.on("activate", function (): void {
        // macOS expects that a new window is created if
        // the doc icon is clicked
        if (BrowserWindow.getAllWindows().length === 0) {
            const mainWin = new Window({ url: appURL }, "win-ctrl-main");
        }
    });
});

// Quit when all windows are closed unless we are running
// macOS
app.on("window-all-closed", function (): void {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Dissable navigation as it is not needed
app.on("web-contents-created", (event, contents) => {
    contents.on("will-navigate", (event, navigationURL) => {
        event.preventDefault();
    });
});
