import client from "./src/Client";
new client().start();

process.on("uncaughtException", err => console.error(err));
process.on("uncaughtExceptionMonitor", err => console.error(err));
process.on("unhandledRejection", err => console.error(err));
