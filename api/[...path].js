import serverless from "serverless-http";
import { app } from "../dist/server/node-build.mjs";

const handler = serverless(app);

export default handler;
