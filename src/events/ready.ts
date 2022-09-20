import { ActivityType } from "discord.js";
import Event from "../models/Event";

export default new Event({
    name: "ready",
    async run(client) {
        try {
            console.log(`The bot ${client.user.tag} is online!`);
            await client.application.fetch();
            await client.loadSlash();
            client.user.setPresence({ activities: [{ name: "with TypeScript :)", type: ActivityType.Playing }], status: "online" });
        } catch (error) {
            console.error(error);
        }
    }
});
