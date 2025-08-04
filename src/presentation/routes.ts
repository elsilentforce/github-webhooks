import { Elysia } from "elysia";
import { githubRoutes } from "./github/routes";

export const appRoutes = new Elysia({ prefix: '/api'})
  .use(githubRoutes);
