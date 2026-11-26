// @ts-check
import { module } from "@prisma/composer";
import { envSecret } from "@prisma/composer-prisma-cloud";
import { postgres } from "@prisma/composer-prisma-cloud/orm";
import { appData } from "./data.mjs";
import expenseTrackerApiService from "./service.mjs";

export default module("expense-tracker-api", ({ provision }) => {
  // Deploy replays the committed migrations/ (found via prisma.config.ts)
  // before the service starts.
  const db = provision(
    postgres({ name: "database", contract: appData, config: "./prisma.config.ts" }),
  );

  provision(expenseTrackerApiService, {
    id: "expensetrackerapi",
    deps: { db },
    input: { jwtSecret: envSecret("JWT_SECRET") },
  });
});
