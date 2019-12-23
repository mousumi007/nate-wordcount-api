import * as http from "http";
import * as app from "./app";

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "dev";
const server = http.createServer(app);
server.listen(port, () => {
  console.log("server is running on http://localhost:%d in %s mode", port, env);
});
