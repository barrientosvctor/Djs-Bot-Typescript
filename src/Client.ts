import discord from "discord.js";
import Command from "./models/Command";
import Event from "./models/Event";
import config from "../config.json";
import fs from "fs";
const slashCommands = [];

export default class client extends discord.Client {
    constructor() {
        super({ intents: 3276799, allowedMentions: { repliedUser: false } });
    }
    // Implementing new properties to client class
    public commands: discord.Collection<string, Command> = new discord.Collection();
    public aliases: discord.Collection<string, string> = new discord.Collection();
    public slash: discord.Collection<string, any> = new discord.Collection();

    protected async loadHandlers() {
        // Command handler
        fs.readdirSync("./src/commands/").filter(f => f.endsWith(".ts")).forEach(async file => {
            const cmd: Command = (await import(`./commands/${file}`)).default;

            this.commands.set(cmd.name, cmd);
            // It implements aliases to bot commands
            if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => this.aliases.set(alias, cmd.name));
        });

        // Event handler
        fs.readdirSync("./src/events/").filter(f => f.endsWith(".ts")).forEach(async file => {
            const event: Event = (await import(`./events/${file}`)).default;

            if (event.once) this.once(event.name, event.run.bind(null, this));
            else this.on(event.name, event.run.bind(null, this));
        });

        // Context menus handler
        fs.readdirSync("./src/context/").filter(f => f.endsWith(".ts")).forEach(async file => {
            const context = (await import(`./context/${file}`)).default;

            this.slash.set(context.data.name, context);
            slashCommands.push(context.data.toJSON());
        });

        // Slash command handler
        fs.readdirSync("./src/slashcommands/").filter(f => f.endsWith(".ts")).forEach(async file => {
            const slash_command = (await import(`./slashcommands/${file}`)).default;

            this.slash.set(slash_command.data.name, slash_command);
            slashCommands.push(slash_command.data.toJSON());
        });

        console.log(`[CMD] Commands loaded!`);
        console.log(`[EVENT] Events loaded!`);
        console.log(`[SLASH] Slash commands and context menus are loading...`);
    }

    public async loadSlash() {
        if (!this.guilds.cache.get(config.slash.serverTest)) throw new Error("The test server doesn't found in cache.");
        else {
            let slash_status: string;
            if (config.slash.testing) {
                slash_status = "(guild)";
                await this.guilds.cache.get(config.slash.serverTest).commands?.set(slashCommands);
            } else {
                slash_status = "(public)";
                this.application.commands?.set(slashCommands);
            }
            console.log(`[SLASH] Slash commands and context menus loaded! ${slash_status}`);
        }
    }

    public async start() {
        this.login(config.token);
        this.loadHandlers();
    }
}
