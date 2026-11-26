// @ts-check
// Prisma Compute entry point (see service.mjs). Not used by `pnpm start*`.
//
// Composer hands the provisioned database and secrets to this process through
// service.load()/service.input(). The Nest app reads plain environment
// variables, so map them here, before the app module graph is loaded.
import service from "../service.mjs";

const { db } = service.load();
const { jwtSecret } = service.input();

process.env.DATABASE_URL = db.url;
process.env.JWT_SECRET = jwtSecret.expose();
process.env.PORT = String(service.port());

await import("./main.js");
