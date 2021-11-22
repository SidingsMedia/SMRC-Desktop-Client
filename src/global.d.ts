// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

// SPDX-License-Identifier: MIT

interface Window {
    control: {
        registerIPC(channel: string, callback: Function): void;
        openDevTools(): void;
        closeDevTools(): void;
        toggleDevTools(): void;
        close(): void;
        minimize(): void;
        maximize(): void;
        unMaximize(): void;
        toggleFullScreen(): void;
        platform: string;
    };
}
