import fs from "node:fs";
import client from "../Client";

export const SlashCommandHandler = (bot: client) => {
  fs.readdirSync("./src/slashcommands/")
    .filter(f => f.endsWith(".ts"))
    .forEach(async file => {
      const slash_command = (await import(`../slashcommands/${file}`)).default;

      bot.slash.set(slash_command.data.name, slash_command);
    });
  console.log("[SLASH] Slash commands loaded!");
};
