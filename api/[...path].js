import app from "../dist/server/production.mjs";

export default (req, res) => {
  app(req, res);
};
