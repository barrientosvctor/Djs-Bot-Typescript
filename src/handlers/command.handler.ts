import fs from "node:fs";
import client from "../Client";
import Command from "../models/Command";

export const CommandHandler = (bot: client) => {
    fs.readdirSync("./src/commands/").filter(f => f.endsWith(".ts")).forEach(async file => {
        const cmd: Command = (await import(`../commands/${file}`)).default;

        bot.commands.set(cmd.name, cmd);
        // It implements aliases to bot commands
        if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => bot.aliases.set(alias, cmd.name));
    });
    console.log(`[CMD] Commands loaded!`);
}
