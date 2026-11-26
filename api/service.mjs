// @ts-check
import node from "@prisma/composer/node";
import { secretString } from "@prisma/composer/arktype";
import { compute } from "@prisma/composer-prisma-cloud";
import { postgres } from "@prisma/composer-prisma-cloud/orm";
import { type } from "arktype";
import { appData } from "./data.mjs";

export default compute({
  name: "expense-tracker-api",
  deps: { db: postgres(appData) },
  input: type({ jwtSecret: secretString() }),
  // `nest build` emits dist/; composer-main.mjs (copied from src/ as a Nest
  // asset) reads load()/input() and then boots dist/main.js.
  build: node({ module: import.meta.url, dir: "dist", entry: "composer-main.mjs" }),
});
