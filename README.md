<!--
SPDX-FileCopyrightText: Copyright (c) 2021 Sidings Media

SPDX-License-Identifier: MIT
-->

# Sidings Media Railway Controller Desktop Client

[![REUSE status](https://api.reuse.software/badge/github.com/SidingsMedia/SMRC-Desktop-Client)](https://api.reuse.software/info/github.com/SidingsMedia/SMRC-Desktop-Client) ![GitHub branch checks state](https://img.shields.io/github/checks-status/SidingsMedia/SMRC-Desktop-Client/main?label=main%20checks) ![GitHub branch checks state](https://img.shields.io/github/checks-status/SidingsMedia/SMRC-Desktop-Client/develop?label=develop%20checks) ![GitHub issues](https://img.shields.io/github/issues/SidingsMedia/SMRC-Desktop-Client) ![GitHub last commit](https://img.shields.io/github/last-commit/sidingsmedia/SMRC-Desktop-Client) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SidingsMedia/SMRC-Desktop-Client) ![Lines of code](https://img.shields.io/tokei/lines/github/SidingsMedia/SMRC-Desktop-Client)

This is the desktop client for Sidings Media Railway Controller

## For developers

### Directory structure

The project uses the following directory structure:

```
    SMRC-Desktop-Client/
	├─ .github/
	├─ .reuse/
	├─ config/
	├─ LICENSES/
	├─ main-process/
	├─ public/
	├─ scripts/
	├─ src/
	│  ├─ styles/
	│  ├─ ui/
```


The first two directories are for project administration. They contain config files for managing the repository. The `config/` directory contains configuration ejected from create-react-app. This config controls things like building the REACT files and running the development server. The `main-process/` directory contains the source files for the electron app and the main process. Files like the preloader and main entry point are located here. `LICENSES/` contains all the licences used in this repository. They have been downloaded using the reuse tool. `public/` contains all of the files you want to be accessible to REACT such as images. They will be copied into `build/` when the react files are built. This directory contains all of the files created by create-react-app. `scripts/` contains all of the scripts referenced by package.json. This includes the scripts that were ejected by react-scripts. `src/` contains two sub-directories, `styles/` and `ui/`. `styles/` contains all of the styles for the react components. `ui/` contains the react components themselves.

### Building

To build app from source run `yarn build`. You can also build the electron code and REACT code separately by running `yarn react:build` and `yarn electron:build` respectivly. The built files are output to the `build/` directory. REACT files are in the root of the `build/` directory with the electron files being located in the `build/electron/` sub directory. Note: if you are building react and electron seperatly, react must be build first as it clears the directory. If electron is built first any files that were created will be deleted when react is built.

### Running

To run the app in development mode use the command `yarn electron:dev`. This will start the REACT development server on `localhost:3000` and start the electron app. It will also monitor the electron files for changes and reload electron if any are detected. There is no need to build the app to run it in development mode as the electron files are built automatically. The REACT files are not built as they are served by the development server.

### Packaging

Packaging the app can be done using the scripts availibe in package.json. Simply use the command `yarn electron:package:<platform>` where `<platform>` is one of `mac`, `win` or `linux`. There is no need to build the project before running these commands as this is done during packaging. The compiled binarys will then be availible in the `dist/` directory. The unpacked files are located in `dist/<platform>-unpacked`. An installer is also provided in the `dist/` directory.

## Licence

This repo uses the [REUSE](https://reuse.software) standard in order to communicate the correct licence for the file. For those unfamiliar with the standard the licence for each file can be found in one of three places. The licence will either be in a comment block at the top of the file, in a `.license` file with the same name as the file, or in the dep5 file located in the `.reuse` directory. If you are unsure of the licencing terms please contact [contact@sidingsmedia.com](mailto:contact@sidingsmedia.com?subject=SMRC%20Licence). All files committed to this repo must contain valid licencing information or the pull request can not be accepted.
