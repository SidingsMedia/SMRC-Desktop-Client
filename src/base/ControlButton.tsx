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

    private win32(type: string): any {
        this.classNames.push("win32Icon", "buttonRight");
        switch (type) {
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
        return [this.classNames.toString().replace(/,/g, " "), this.icon];
    }

    private linux(type: string) {
        this.classNames.push("linuxIcon", "buttonRight");
        switch (type) {
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
        return [this.classNames.toString().replace(/,/g, " "), this.icon];
    }

    private darwin(type: string) {
        this.classNames.push("darwinIcon", "buttonLeft");
        switch (type) {
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
        return [this.classNames.toString().replace(/,/g, " "), this.icon];
    }

    public render() {
        this.classNames = ["TitleBarButton"];
        var contents;
        switch (this.props.platform) {
            case "win32":
                contents = this.win32(this.props.type);
                break;
            case "darwin":
                contents = this.darwin(this.props.type);
                break;
            default:
                contents = this.linux(this.props.type);
                break;
        }
        return (
            <span className={contents[0]} onClick={this.handleClick}>
                <FontAwesomeIcon icon={contents[1]} />
            </span>
        );
    }
}
