import { Elysia } from "elysia";
import { GithubService } from "../services";

export const githubRoutes = new Elysia()
  .post('/', ctx => GithubService.webhookHandler(ctx));
