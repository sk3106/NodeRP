# NodeRP
[![Version](https://noderp.sk-jones.com/api/v1.svg)](https://github.com/Jones3106/NodeRP/releases)

***NOTE: This framework is currently in ALPHA. If you find any bugs please report them and do not use it for production.***

A Lightweight & Simple Roleplay framework for FiveM written in NodeJS


## Description
NodeRP is a simple RP framework for FiveM written in JavaScript/NodeJS. It stores data in a MySQL Database and also has support for discord webhooks (look below for a full list of features). I have a small amount of time available in which I can develop this due to studies and work etc so there might be a delay in development sometimes. Contributions are welcomed no matter how small it is.

## Features
- Data handling(saving and loading data from the Database)
- Logging through Discord Webhooks
- Basic admin features
- Basic Jobs
- Basic Properties
- Basic Shops/Businesses
- Commands can be added easily
- Graphical interface for menus, dialogs etc
- Support for creating addon resources

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
You can find the documentation at [NodeRP Website](https://noderp.sk-jones.com).

## TODO
### V1.0.0 ALPHA
- [x] Create a base that takes care of registering, loading, spawning and saving players.
- [x] Add welcome messages, discord integration, chat functions and ability to create locales.
- [ ] Add essential events and functions
- [ ] Release ALPHA version

### V2.0.0 BETA
- [ ] Save player skin and position every x minutes
- [ ] Spawn player at last position with last skin
- [ ] Add menus, blips
- [ ] Add basic shops
- [ ] Add basic admin system
- [ ] Add basic jobs
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

**A:** Support and Donations are welcomed and will keep the framework running. You can contact me on [Discord](https://discord.gg/g3rQsbA)(Jones#7051) or through [Email](mailto:thejones3106@gmail.com).
