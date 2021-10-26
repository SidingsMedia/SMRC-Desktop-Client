// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

// SPDX-License-Identifier: MIT

import React from "react";
import "../css/base/Titlebar.css";
import { ControlButton } from "./ControlButton";

type titlebarProps = {
    winName: string;
    platform: string;
};
type titlebarState = {
    focus: boolean;
    maximized: boolean;
};

type ctrlIPCProps = {
    type: string;
    value: any;
};

export class Titlebar extends React.Component<titlebarProps, titlebarState> {
    state: titlebarState = {
        focus: false,
        maximized: false,
    };
    private _ismounted: boolean;
    private maximized: boolean;
    constructor(props: titlebarProps) {
        super(props);
        // this.state = {
        //     focus: false,
        //     maximized: false,
        // };

        this.maximized = false;

        // Used to prevent errors when accessing state
        this._ismounted = false;

        // Make sure to bind the function to get access to state
        window.control.registerIPC("win-ctrl-main", this.ctrlIPC.bind(this));
    }
    componentDidMount() {
        this._ismounted = true;
        this.setState({
            focus: false,
            maximized: false,
        });
    }

    componentWillUnmount() {
        this._ismounted = false;
    }
    render() {
        return (
            <div className={`Titlebar ${this.state.focus ? "focus" : ""}`}>
                <p className="WindowName">{this.props.winName}</p>
                <ControlButton type="close" platform={this.props.platform} />
                <ControlButton
                    type={this.state.maximized ? "unMaximize" : "maximize"}
                    platform={this.props.platform}
                />
                <ControlButton type="minimize" platform={this.props.platform} />
            </div>
        );
    }
    ctrlIPC(arg: ctrlIPCProps): void {
        switch (arg.type) {
            case "focus":
                this.windowFocus(arg.value);
                break;
            case "maximize":
                if (this._ismounted) {
                    this.setState({ maximized: arg.value });
                }
                break;
            default:
                console.error(arg);
        }
    }
    windowFocus(arg: string) {
        // We need to check if the component is mounted before we
        // start trying to change the state. This is because this
        // callback can be called before the function is mounted.
        if (this._ismounted) {
            if (arg === "focus") {
                this.setState({ focus: true });
            } else {
                this.setState({ focus: false });
            }
        }
    }
}
