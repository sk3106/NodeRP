# NodeRP
***NOTE: This framework is currently in BETA so you may find some bugs and if you do please report them.***

A Roleplay framework for FiveM written in NodeJS


## Description
NodeRP is a simple RP framework for FiveM written in JavaScript/NodeJS. It stores data in a MySQL Database and also has support for discord webhooks (look below for a full list of features). Feel free to contribute.

## Features
- Data handling(saving and loading data from the Database)
- Logging through Discord Webhooks
- Basic admin features
- Commands can be added easily
- Graphical interface for menus, dialogs etc
- Support for creating addon resources/extensions

## Dependencies
- NodeJS
- MySQL Database
- Yarn(comes with FiveM Server data in most cases)

## Installation
- Put the folder named 'NodeRP' in your resources folder
- Import the SQL file in your Database
- Add `ensure NodeRP` to server.cfg
- Open config.js and fill in the details such as MySQL username, password, discord webhook url etc
- Start the server and enjoy

## Documentation
You can find the documentation at [NodeRP Website](noderp.sk-jones.com).

## FAQs
**Q:** I'm getting 
> Warning: Resource NodeRP does not specify an `fx_version` in fxmanifest.lua. 
What should I do?
**A:** You need to update your FiveM server artifacts. Download the latest version depending on your OS: [Linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/) [Windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/).
