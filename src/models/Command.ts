import client from "../Client";
import discord from "discord.js";

interface CommandData {
    name: string,
    description: string,
    cooldown: number,
    aliases?: string[],
    memberPerms?: string[],
    clientPerms?: string[],
    run: (client: client, message: discord.Message, args: String[]) => void;
}

export default class Command {
    public name: CommandData["name"];
    public description: CommandData["description"];
    public cooldown: CommandData["cooldown"];
    public aliases: CommandData["aliases"];
    public memberPerms: CommandData["memberPerms"];
    public clientPerms: CommandData["clientPerms"];
    public run: CommandData["run"];

    constructor(options: CommandData) {
        this.name = options.name;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.aliases = options.aliases;
        this.memberPerms = options.memberPerms;
        this.clientPerms = options.clientPerms;
        this.run = options.run;
    }
}
