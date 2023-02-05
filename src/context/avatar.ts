import discord from "discord.js";
import client from "../Client";

export default {
  data: new discord.ContextMenuCommandBuilder().setName("Avatar").setType(2),
  run(client: client, interaction: discord.ContextMenuCommandInteraction) {
    try {
      const member: discord.GuildMember | undefined =
        interaction.guild?.members.cache.get(interaction.targetId);
      const embed = new discord.EmbedBuilder()
        .setTitle(`${member?.user.username}'s Avatar`)
        .setImage(
          member?.user.displayAvatarURL({ size: 2048, extension: "png" }) ||
            null
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
