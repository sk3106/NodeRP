# ***NOTE: Work on this has been stopped for an unknown time period due to time difficulties, lack of support & lack of interest.***

# NodeRP
[![](https://noderp.sk-jones.com/api/v1.svg)](https://github.com/Jones3106/NodeRP/releases) [![](https://img.shields.io/github/license/Jones3106/NodeRP)](https://github.com/Jones3106/NodeRP/blob/master/LICENSE) [![Hits](http://hits.dwyl.com/Jones3106/NodeRP.svg)](http://hits.dwyl.com/Jones3106/NodeRP)


***NOTE: This framework is currently in ALPHA. If you find any bugs please report them and do not use it for production.***

A Lightweight & Simple Roleplay framework for FiveM written in NodeJS


## Description
NodeRP is a simple RP framework for FiveM written in JavaScript/NodeJS. It stores data in a MySQL Database and also has support for discord webhooks (look below for a full list of features). I have a small amount of time available in which I can develop this due to studies and work etc so there might be a delay in development sometimes. Contributions are welcomed no matter how small it is.

## Features
- Easy to use API
- Everything can be configured in config.js and Database
- Data handling(saving and loading data from the Database)
- Logging through Discord Webhooks
- Language Localization
- Basic admin features
- Basic Jobs
- Basic Properties
- Basic Shops/Businesses
- Basic vehicle system
- Commands can be added easily
- Graphical interface for menus, dialogs etc
- Support for creating addon resources

## Dependencies
- NodeJS
- MySQL Database
- Yarn(comes with FiveM Server data in most cases)

## Installation
- Put the folder named 'NodeRP' in your resources/\[local] folder
- Create a Database with the name of your choice(don't forget to set it in config.js)
- Add `ensure NodeRP` to server.cfg
- Add `add_ace resource.NodeRP command.add_principal allow` and `add_ace resource.NodeRP command.add_ace allow` to server.cfg
- Open config.js and fill in the details such as MySQL username, password, discord webhook url etc
- Start the server and enjoy

## Documentation
You can find the documentation at [NodeRP Website](https://noderp.sk-jones.com).

## TODO
### Misc
- [ ] Find a way to get info from server on client like a callback
- [ ] Add basic UI
- [ ] Write documentation on website

### v2.0.0 BETA
- [ ] Change player authentication from Steam to License
- [ ] Fix player auto save issues
- [x] Save player skin and position every x minutes
- [ ] Spawn player at last position with last skin
- [ ] Add a better way to create NodeRP based resources

### v2.x.x BETA
- [ ] Add menus, blips
- [ ] Add basic shops
- [ ] Add basic admin system
- [ ] Add basic vehicle system
- [ ] Add basic property system

## FAQs
**Q:** I'm getting 
> Warning: Resource NodeRP does not specify an `fx_version` in fxmanifest.lua. 

What should I do?

**A:** You need to update your FiveM server artifacts. Download the latest version depending on your OS: [Linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/) [Windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/).

**Q:** I'm getting an error which I'm unable to fix, what should I do?

**A:** If you have the newest server artifacts and NodeRP version and you have double checked the config.js file then you should use the create an issue option in the Issues tab of this repository. On the other hand, you could join our [discord server](https://discord.gg/g3rQsbA) for a more quick response.

**Q:** I'd like to support the development of this framework, who should I contact or what do I need to do?

**A:** Support and Donations are welcomed and will keep the framework running. You can contact me on [Discord](https://discord.gg/g3rQsbA)(Jones#7051) or through [Email](mailto:jones@sk-jones.com).

## Screenshots
![Discord Embed](https://i.imgur.com/rmp3oxV.png)
![NodeRP Startup Messages First Time](https://i.imgur.com/esti5tA.png)
![NodeRP Usual Startup Messages](https://i.imgur.com/1Zgfxm5.png)
![NodeRP First generation spawn](https://i.imgur.com/Q5C5sNu.jpg)
