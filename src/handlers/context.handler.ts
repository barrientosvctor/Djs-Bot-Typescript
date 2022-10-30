import fs from "node:fs";
import client from "../Client";

export const ContextHandler = (bot: client) => {
    fs.readdirSync("./src/context/").filter(f => f.endsWith(".ts")).forEach(async file => {
        const context = (await import(`../context/${file}`)).default;

        bot.slash.set(context.data.name, context);
    });
    console.log(`[CONTEXT] Context menus loaded!`);
}
