import serverless from "serverless-http";
import { app } from "../dist/server/production.mjs";

const handler = serverless(app);

export default handler;
