import { CommandInteraction } from "discord.js";
import Event from "../models/Event";

export default new Event({
    name: "interactionCreate",
    async run(client, interaction: CommandInteraction) {
        try {
            const slash = client.slash.get(interaction.commandName);
            if (!slash) return;

            const runCommands = async () => {
                await interaction.deferReply().catch(() => {});

                try {
                    slash.run(client, interaction);
                } catch (error) {
                    console.error(error);
                }
            }

            if (interaction.isContextMenuCommand()) await runCommands();
            if (interaction.isCommand()) await runCommands();
        } catch (error) {
            console.error(error);
        }
    }
});
