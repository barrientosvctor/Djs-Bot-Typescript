import fs from "node:fs";
import client from "../Client";
import Event from "../models/Event";

export const EventHandler = (bot: client) => {
  fs.readdirSync("./src/events/")
    .filter(f => f.endsWith(".ts"))
    .forEach(async file => {
      const event: Event = (await import(`../events/${file}`)).default;

      if (event.once) bot.once(event.name, event.run.bind(null, bot));
      else bot.on(event.name, event.run.bind(null, bot));
    });
  console.log("[EVENT] Events loaded!");
};
