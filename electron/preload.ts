// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media
// SPDX-License-Identifier: MIT

import { contextBridge, ipcRenderer } from "electron";

// TODO: Implement settings in electron.ts
contextBridge.exposeInMainWorld("settings", {
    getSettings: () => ipcRenderer.invoke("get-settings"),
});
