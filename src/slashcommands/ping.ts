import discord from "discord.js";
import client from "../Client";

export default {
  data: new discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("It shows the bot latency."),
  run(client: client, interaction: discord.CommandInteraction) {
    interaction.editReply(
      `Pong! 🏓 -- Message: *${
        Date.now() - interaction.createdTimestamp
      }ms* | WebSocket: *${client.ws.ping}ms*`
    );
  },
};
