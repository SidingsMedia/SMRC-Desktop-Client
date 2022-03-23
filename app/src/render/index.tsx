// SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

// SPDX-License-Identifier: MIT

import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { App } from "./App";

library.add(far, fas);

ReactDOM.render(
    <React.StrictMode>
        <App winName="Sidings Media Railway Controller" />
    </React.StrictMode>,
    document.getElementById("root")
);
