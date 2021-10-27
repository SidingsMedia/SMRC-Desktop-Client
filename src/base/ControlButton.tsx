// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

// SPDX-License-Identifier: MIT

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/base/ControlButton.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type controlButtonProps = {
    type: string;
    platform: string;
};
type controlButtonState = {
    type: string;
};

export class ControlButton extends React.Component<
    controlButtonProps,
    controlButtonState
> {
    private icon: IconProp;
    private classNames: Array<string>;
    constructor(props: controlButtonProps) {
        super(props);
        this.state = {
            type: this.props.type,
        };
        this.handleClick = this.handleClick.bind(this);
        this.icon = ["fas", "times"];
        this.classNames = ["TitleBarButton"];
    }

    private handleClick(): void {
        switch (this.props.type) {
            case "close":
                window.control.close();
                break;
            case "minimize":
                window.control.minimize();
                break;
            case "maximize":
                window.control.maximize();
                break;
            case "unMaximize":
                window.control.unMaximize();
                break;
        }
    }

    public render() {
        this.classNames = ["TitleBarButton"];
        this.classNames.push("win32Icon", "buttonRight");

        switch (this.props.type) {
            case "close":
                this.icon = ["fas", "times"];
                this.classNames.push("ButtonClose");
                break;
            case "minimize":
                this.icon = ["fas", "window-minimize"];
                break;
            case "maximize":
                this.icon = ["far", "window-maximize"];
                break;
            case "unMaximize":
                this.icon = ["far", "window-restore"];
                break;
        }
        return (
            <span
                className={this.classNames.toString().replace(/,/g, " ")}
                onClick={this.handleClick}
            >
                <FontAwesomeIcon icon={this.icon} />
            </span>
        );
    }
}
