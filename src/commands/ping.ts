import Command from "../models/Command";

export default new Command({
    name: "ping",
    description: "It shows the bot latency.",
    aliases: ["p"],
    cooldown: 3,
    run(client, message) {
        message.reply(`Pong! 🏓 *${client.ws.ping}ms*`)
    }
});
