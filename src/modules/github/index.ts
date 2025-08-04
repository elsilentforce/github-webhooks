import { Context, Elysia } from "elysia";
import { GithubService } from "./github.service";

export const github = new Elysia({ prefix: '/github' })
  .post('/', ({body, headers}) => GithubService.webhookHandler({body, headers} as Context));
