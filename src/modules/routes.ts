import { Elysia } from "elysia";
import { github } from "./github";

export const appRoutes = new Elysia({ prefix: '/api'})
  .use(github);
