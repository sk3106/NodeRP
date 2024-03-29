# NodeRP
[![](https://noderp.sk-jones.com/api/v1.svg)](https://github.com/sk3106/NodeRP/releases) [![](https://img.shields.io/github/license/sk3106/NodeRP)](https://github.com/sk3106/NodeRP/blob/master/LICENSE) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fsk3106%2FNodeRP&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)]()


***NOTE: This framework is currently in BETA. If you find any bugs please report them by creating an issue in the issues tab.***

A Lightweight & Simple Roleplay framework for FiveM written in NodeJS


## Description
NodeRP is a simple RP framework for FiveM written in JavaScript/NodeJS. It stores data in a MySQL Database and also has support for discord webhooks (look below for a full list of features). Due to my schedule, there might be a delay in development sometimes. Contributions are welcomed no matter how small it is.

## Features
- Easy to use API
- Everything can be configured in config.js and Database
- Data handling(saving and loading data from the Database)
- Logging through Discord Webhooks
- Server can also be controlled through Discord using NodeRP Bot
- Language Localization
- Commands can be added easily
- Graphical Interface for menus, dialogs etc
- Support for creating addon resources

## Dependencies
- Latest version of FiveM Server
- NodeJS
- MySQL Database
- Yarn(comes with FiveM Server data in most cases)

## Installation
- Put the folder named 'NodeRP' in your resources/\[local] folder
- Create a Database with the name of your choice(don't forget to set it in config.js)
- Add `ensure NodeRP` to server.cfg just after the default FiveM resources
- Add `add_ace resource.NodeRP command.add_principal allow` and `add_ace resource.NodeRP command.add_ace allow` to server.cfg
- Open config.js and fill in the details such as MySQL username, password, discord webhook url etc
- Start the server and enjoy

## Documentation
~~You can find the documentation at NodeRP Website~~

## TODO
### Misc
- [ ] Add basic UI
- [ ] Write documentation on website

### v2.1.0 BETA
- [x] Set player skin at spawn
- [x] Add Death/Revival System
- [x] Spawn player at Closest Hospital when dead
- [x] Fix bugs
- [x] Add better Spawn System
- [x] Add a better way for Delays

### v2.x.x BETA
- [ ] Add menus, blips

## FAQs
**Q:** I'm getting 
> Warning: Resource NodeRP does not specify an `fx_version` in fxmanifest.lua. 

What should I do?

**A:** You need to update your FiveM server artifacts. Download the latest version depending on your OS: [Linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/) [Windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/).

**Q:** I'm getting an error which I'm unable to fix, what should I do?

**A:** If you have the newest server artifacts and NodeRP version and you have double checked the config.js file then you should use the create an issue option in the Issues tab of this repository.

**Q:** I'd like to support the development of this framework, who should I contact or what do I need to do?

**A:** Any kind of support is welcomed and will help keep the framework running. You could contact us on [Email](mailto:mail.thejones@gmail.com).

## Screenshots
![Discord Embed](https://i.imgur.com/CpwEPbT.png)
![NodeRP Startup Messages First Time](https://i.imgur.com/esti5tA.png)
![NodeRP Usual Startup Messages](https://i.imgur.com/qFqWUEq.png)
![NodeRP Player Join Msgs](https://i.imgur.com/SvsIdqr.png)
![NodeRP Second Gen Spawn](https://i.imgur.com/ry5gW2j.jpg)
![NodeRP Player Save](https://i.imgur.com/Cig95oU.png)
![NodeRP Discord Player Leave](https://i.imgur.com/0T2zloK.png)
