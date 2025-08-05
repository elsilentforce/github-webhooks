import { Context, Elysia } from "elysia";
import { GithubService } from "./github.service";
import { GithubSHA256 } from "../../utils";

export const github = new Elysia({ prefix: '/github' })
  .post('/',
    ({body, headers}) => GithubService.webhookHandler({body, headers} as Context),
    {
      async beforeHandle({ status, headers, body }){
        const auth = await GithubSHA256.verifyGithubSignature(headers, body);
        if(!auth){
          return status(401);
        }
      }
    }
  );
