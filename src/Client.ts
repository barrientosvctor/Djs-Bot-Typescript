import discord from "discord.js";
import Command from "./models/Command";
import config from "../config.json";
import {
  CommandHandler,
  EventHandler,
  ContextHandler,
  SlashCommandHandler,
} from "./handlers";

export default class client extends discord.Client {
  constructor() {
    super({ intents: 3276799, allowedMentions: { repliedUser: false } });
  }
  // Implementing new properties to client class
  public commands: discord.Collection<string, Command> =
    new discord.Collection();
  public aliases: discord.Collection<string, string> = new discord.Collection();
  public slash: discord.Collection<string, any> = new discord.Collection();

  public async start() {
    this.login(config.token);
    CommandHandler(this);
    EventHandler(this);
    SlashCommandHandler(this);
    ContextHandler(this);
  }

  public async loadSlash() {
    if (!this.guilds.cache.get(config.slash.serverTest))
      throw new Error("The test server doesn't found in cache.");
    else {
      let slash_status: string;
      if (config.slash.testing) {
        slash_status = "(guild)";
        await this.guilds.cache
          .get(config.slash.serverTest)
          ?.commands?.set(this.slash.map(cmd => cmd.data.toJSON()))
          .catch(console.error);
      } else {
        slash_status = "(public)";
        this.application?.commands
          ?.set(this.slash.map(cmd => cmd.data.toJSON()))
          .catch(console.error);
      }
      console.log(
        `[SLASH] Slash commands and context menus uploaded! ${slash_status}`
      );
    }
  }
}
