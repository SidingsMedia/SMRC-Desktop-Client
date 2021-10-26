// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

// SPDX-License-Identifier: MIT

import React from "react";
import "./css/App.css";
import { Titlebar } from "./base/Titlebar";

type appProps = {
    winName: string;
};

export class App extends React.Component<appProps> {
    render() {
        return (
            <div className="App">
                <header>
                    <Titlebar
                        winName={this.props.winName}
                        platform={window.control.platform}
                    />
                </header>
            </div>
        );
    }
}
