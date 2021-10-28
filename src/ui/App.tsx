// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

// SPDX-License-Identifier: MIT

import React from "react";
import "../styles/App.css";
import { Titlebar } from "./base/Titlebar";

type appProps = {
    winName: string;
};

export class App extends React.Component<appProps> {
    /**
     * Decides whether to render the titlebar depending upon the
     * platform. The titlebar should only be rendered if the app
     * is running on windows. The default titlebar is used on
     * all other operating systems.
     *
     * @returns {JSX.Element} The JSX element
     */
    renderTitleBar(): JSX.Element | undefined {
        if (process.platform === "win32") {
            return (
                <header>
                    <Titlebar
                        winName={this.props.winName}
                        platform={window.control.platform}
                    />
                </header>
            );
        } else {
            return undefined;
        }
    }
    render() {
        return <div className="App">{this.renderTitleBar()}</div>;
    }
}
