import { createProgram } from "./program";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

export async function main() {
  const program = createProgram();
  program.parse();
}
