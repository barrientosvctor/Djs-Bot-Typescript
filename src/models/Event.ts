import client from "../Client";
import discord from "discord.js";

interface EventData {
  name: keyof discord.ClientEvents;
  once?: boolean;
  run: (client: client, ...args: any[]) => void;
}

export default class Event {
  public name: EventData["name"];
  public once: EventData["once"];
  public run: EventData["run"];

  constructor(options: EventData) {
    this.name = options.name;
    this.once = options.once;
    this.run = options.run;
  }
}
