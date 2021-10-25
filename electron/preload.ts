// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media
// SPDX-License-Identifier: MIT

import { contextBridge, ipcRenderer } from "electron";

var ctrlChannel: string = "win-ctrl";
var ipcRegistered = new Set();

/**
 * Checks if the provided IPC channel has been registered.
 * Also writes error to console
 * @param {string} channel - The IPC channel
 * @returns {boolean} Is the specified IPC channel registered
 */
function checkIpc(channel: string): boolean {
    if (ipcRegistered.has(channel)) {
        return true;
    } else {
        console.error(`IPC Channel ${channel} has not been registered`);
        return false;
    }
}

contextBridge.exposeInMainWorld("window-control", {
    registerIPC: (channel: string, callback: Function) => {
        ctrlChannel = channel;
        ipcRenderer.on(ctrlChannel, (event, arg) => {
            callback(arg);
        });
        ipcRegistered.add(ctrlChannel);
    },
    openDevTools: () => ipcRenderer.send(ctrlChannel, "openDevTools"),
    closeDevTools: () => ipcRenderer.send(ctrlChannel, "closeDevTools"),
    toggleDevTools: () => ipcRenderer.send(ctrlChannel, "toggleDevTools"),
    close: () => ipcRenderer.send(ctrlChannel, "close"),
    minimize: () => ipcRenderer.send(ctrlChannel, "minimize"),
    maximize: () => ipcRenderer.send(ctrlChannel, "maximize"),
    unMaximize: () => ipcRenderer.send(ctrlChannel, "unMaximize"),
    toggleFullScreen: () => ipcRenderer.send(ctrlChannel, "toggleFullScreen"),
});
