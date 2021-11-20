// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media
// SPDX-License-Identifier: MIT

import { contextBridge, ipcRenderer } from "electron";

let windowID:number

ipcRenderer.invoke('window-initialize').then((result) =>{
    windowID = result
})

contextBridge.exposeInMainWorld("control", {
    openDevTools: () => ipcRenderer.send(`${windowID}/control/openDevTools`),
    closeDevTools: () => ipcRenderer.send(`${windowID}/control/closeDevTools`),
    toggleDevTools: () => ipcRenderer.send(`${windowID}/control/toggleDevTools`),
    close: () => ipcRenderer.send(`${windowID}/control/close`,),
    minimize: () => ipcRenderer.send(`${windowID}/control/minimize`),
    maximize: () => ipcRenderer.send(`${windowID}/control/maximize`),
    unMaximize: () => ipcRenderer.send(`${windowID}/control/unMaximize`),
    toggleFullScreen: () => ipcRenderer.send(`${windowID}/control/toggleFullScreen`),
    platform: process.platform,
});