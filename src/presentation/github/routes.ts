import { Elysia } from "elysia";
import { GithubService } from "../services";

export const githubRoutes = new Elysia({ prefix: '/github' })
  .post('/', ctx => GithubService.webhookHandler(ctx));
