// @ts-check
import { dataContract } from "@prisma/composer-prisma-cloud/orm";
import contractJson from "./src/prisma/contract.json" with { type: "json" };

/**
 * The one data-contract value both ends of the Postgres edge reference:
 * the service's dependency (service.mjs) and the provisioned database (module.mjs).
 *
 * @type {import("@prisma/composer-prisma-cloud/orm").PostgresContract<import("./src/prisma/contract.d.ts").Contract>}
 */
export const appData = dataContract(contractJson);
