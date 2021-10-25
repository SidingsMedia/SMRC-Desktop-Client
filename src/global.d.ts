interface Window {
    control: {
        registerIPC(channel: string, callback: Function): void;
        openDevTools: void;
        closeDevTools: void;
        toggleDevTools: void;
        close: void;
        minimize: void;
        maximize: void;
        unMaximize: void;
        toggleFullScreen: void;
    };
}
