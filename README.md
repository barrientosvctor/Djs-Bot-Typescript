# DJS v14 Bot using TypeScript 

## Prerequisites
* [Node.js](https://nodejs.org/es/) - A Node.js version greater or equal to 16.9.0.
* [TypeScript](https://www.typescriptlang.org/download)

## Packages list
* [discord.js](https://github.com/discordjs/discord.js/)
* [ts-node](https://github.com/TypeStrong/ts-node)
* [typescript](https://github.com/Microsoft/TypeScript)

## Setup

1. Use `npm i` command to install all packages.

2. Go to [config.json](config.json) file and fill the strings with their bot data.
```json
{
    "token": "their bot token here",
    "prefix": "!",
    "slash": {
        "testing": false,
        "serverTest": "their personal server ID here",
        "botID": "their bot ID here"
    }
}
```

3. Run the project with `npm run start` command.

## Notes

* The property `slash.testing` in [config.json](config.json) file is used to specify if you want to deploy your slash commands only on one server or all servers:

`true`: It deploys only on the server that you specified in `slash.serverTest` property.

`false`: It deploys on all servers.

* I'm using a json file for this example to save the bot data, but if you want could can use Environment Variables, just replace variables in the code.

* I set the intents number to `3276799` in [Client.ts](src/Client.ts) file for have no problem, but you can modify this number with the intents that you need. For this, use the [Discord Intents Calculator](https://discord-intents-calculator.vercel.app/) website.
