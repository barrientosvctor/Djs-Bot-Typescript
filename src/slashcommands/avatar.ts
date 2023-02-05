import discord from "discord.js";
import client from "../Client";

export default {
  data: new discord.SlashCommandBuilder()
    .setName("avatar")
    .setDescription("It shows the profile picture of some member.")
    .addUserOption(opt =>
      opt
        .setName("member")
        .setDescription("Specific the member here.")
        .setRequired(true)
    ),
  run(client: client, interaction: discord.CommandInteraction) {
    try {
      const member: discord.User | null = interaction.options.getUser("member");
      const embed = new discord.EmbedBuilder()
        .setTitle(`${member?.username}'s Avatar`)
        .setImage(
          member?.displayAvatarURL({ size: 2048, extension: "png" }) || null
        )
        .setColor("Random")
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({
            size: 2048,
            extension: "png",
          }),
        });

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};
