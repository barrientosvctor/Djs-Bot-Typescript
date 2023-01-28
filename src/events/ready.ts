import { ActivityType } from "discord.js";
import Event from "../models/Event";

export default new Event({
    name: "ready",
    async run(client) {
        try {
            await client.application?.fetch();
            await client.loadSlash();
            console.log(`The ${client.user?.tag} bot is online!`);
            client.user?.setPresence({ activities: [{ name: "with TypeScript :)", type: ActivityType.Playing }], status: "online" });
        } catch (error) {
            console.error(error);
        }
    }
});
