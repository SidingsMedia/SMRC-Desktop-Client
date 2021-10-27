<!--
SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

SPDX-License-Identifier: MIT
-->

# Sidings Media Railway Controller Desktop Client

[![REUSE status](https://api.reuse.software/badge/github.com/SidingsMedia/SMRC-Desktop-Client)](https://api.reuse.software/info/github.com/SidingsMedia/SMRC-Desktop-Client) ![GitHub issues](https://img.shields.io/github/issues/SidingsMedia/SMRC-Desktop-Client) ![GitHub last commit](https://img.shields.io/github/last-commit/sidingsmedia/SMRC-Desktop-Client) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SidingsMedia/SMRC-Desktop-Client) ![Lines of code](https://img.shields.io/tokei/lines/github/SidingsMedia/SMRC-Desktop-Client)

This is the desktop client for Sidings Media Railway Controller

## Documentation

Documentation for the desktop client can be found at [docs.sidingsmedia.com/projects/smrc/en/latest/clients/desktop-client.html](https://docs.sidingsmedia.com/projects/smrc/en/latest/clients/desktop-client.html). The sources for all documentation can be found in the [Sidings Media Railway Controller](https://github.com/SidingsMedia/Sidings-Media-Railway-Controller) repo under the `docs/` directory.

## Supported operating systems

Currently we are only able to support Linux and Windows with the desktop client. This is because we do not currently have a way to test the application on Apple devies and as such have no way of verifying that it will work as expected. We have tried to make provisions in the code for supporting Apple devices but these should be reagarded as unstable and may or may not function correctly. If you would like to help out with testing for apple devices the please send us an email on [contact@sidingsmedia.com](mailto:contact@sidingsmedia.com).

## For developers

### Developer Documentation

Specific documentation for developers is available at [docs.sidingsmedia.com/projects/smrc/en/latest/developers/desktop-client.html](https://docs.sidingsmedia.com/projects/smrc/en/latest/developers/desktop-client.html).

### Directory structure

The project uses the following directory structure:

```
SMRC-Desktop-Client/
├─ .github/
├─ .reuse/
├─ config/
├─ electron/
├─ LICENSES/
├─ public/
├─ scripts/
├─ src/
```

The first two directories are for project administration. They contain config files for managing the repository. The `config/` directory contains configuration ejected from create-react-app. This config controls things like building the REACT files and running the development server. The `electron/` directory contains the source files for the electron app. Files like the preloader and main entry point are located here. `LICENSES/` contains all the licences used in this repository. They have been downloaded using the reuse tool. `public/` contains all of the files you want to be accessible to REACT such as images. They will be copied into `build/` when the react files are built. This directory contains all of the files created by create-react-app. `scripts/` contains all of the scripts referenced by package.json. This includes the scripts that were ejected by react-scripts. `src/` contains all of the react source files that are compiled into HTML when react is built.

### Building

To build app from source run `yarn build`. You can also build the electron code and REACT code separately by running `yarn react:build` and `yarn electron:build` respectivly. The built files are output to the `build/` directory. REACT files are in the root of the `build/` directory with the electron files being located in the `build/electron/` sub directory. Note: if you are building react and electron seperatly, react must be build first as it clears the directory. If electron is built first any files that were created will be deleted when react is built.

### Running

To run the app in development mode use the command `yarn electron:dev`. This will start the REACT development server on `localhost:3000` and start the electron app. It will also monitor the electron files for changes and reload electron if any are detected. There is no need to build the app to run it in development mode as the electron files are built automatically. The REACT files are not built as they are served by the development server.

### Packaging

Packaging the app can be done using the scripts availibe in package.json. Simply use the command `yarn electron:package:<platform>` where `<platform>` is one of `mac`, `win` or `linux`. There is no need to build the project before running these commands as this is done during packaging. The compiled binarys will then be availible in the `dist/` directory. The unpacked files are located in `dist/<platform>-unpacked`. An installer is also provided in the `dist/` directory.

## Licence

This repo uses the [REUSE](https://reuse.software) standard in order to communicate the correct licence for the file. For those unfamiliar with the standard the licence for each file can be found in one of three places. The licence will either be in a comment block at the top of the file, in a `.license` file with the same name as the file, or in the dep5 file located in the `.reuse` directory. If you are unsure of the licencing terms please contact [contact@sidingsmedia.com](mailto:contact@sidingsmedia.com?subject=SMRC%20Licence). All files committed to this repo must contain valid licencing information or the pull request can not be accepted.
