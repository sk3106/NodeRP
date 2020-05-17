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

**Q:** I'm getting an error which I'm unable to fix, what should I do?
**A:** If you have the newest server artifacts and NodeRP version and you have double checked the config.js file then you should use the create an issue option in the Issues tab of this repository. On the other hand, you could join our discord server for a more quick response.

**Q:** I'd like to support the development of this framework, who should I contact or what do I need to do?
**A:** Support and Donations are welcomed and will keep the framework running. You can contact me on [Discord](Jones#7051) or through [Email](thejones3106@gmail.com). You can also use Patreon for donations.
