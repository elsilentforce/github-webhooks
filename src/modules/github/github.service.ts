import { Context, status } from "elysia"

export abstract class GithubService {
  constructor(){}

  static webhookHandler({body, headers}:Context){
    const event = headers['x-github-event'] ?? 'Unknown';
    const signature = headers['x-hub-signature-256'] ?? 'Unknown';
    // console.log(ctx.body);
    // console.log("Endpoint Llamado!");
    console.log({ event, signature });
    
    return status(202, { message: "Accepted" });
  }
}
