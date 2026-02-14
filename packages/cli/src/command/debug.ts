import { Command } from "commander";

export default new Command("debug")
  .description("For debug purposes")
  .action(async (opts) => {
    console.log(opts);
  });
