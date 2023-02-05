import Event from "../models/Event";
import Command from "../models/Command";
import { Message } from "discord.js";

export default new Event({
  name: "messageCreate",
  async run(client, message: Message) {
    try {
      const prefix = "!";
      const args = message.content.substring(prefix.length).split(" ");
      const command: Command | undefined =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0])!);

      if (
        !args[0] ||
        message.author.bot ||
        !message.guild ||
        !message.content.startsWith(prefix)
      )
        return;

      if (command) {
        try {
          command.run(client, message, args);
        } catch (error) {
          console.error(error);
        }
      } else return message.reply(`The *${args[0]}* command is not found.`);
    } catch (error) {
      console.error(error);
    }
  },
});
