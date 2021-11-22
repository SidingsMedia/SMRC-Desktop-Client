// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

// SPDX-License-Identifier: MIT

import React from "react";

// import windowIcon from "../../logos/rendered/track-bw-square-192.png";

type titlebarProps = {
    winName: string;
    platform: string;
};

export class Titlebar extends React.Component<titlebarProps> {
    render() {
        return (
            <div className={`Titlebar`}>
                <div className="titlebar-drag-region"></div>
                <div
                    className="window-icon"
                    // style={`background-image:${windowIcon};`}
                ></div>
                <p className="WindowName">{this.props.winName}</p>
            </div>
        );
    }
}
