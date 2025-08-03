import { Context } from "elysia"

export class GithubService {
  constructor(){}

  static webhookHandler(ctx:Context){
    // console.log(ctx.body);
    console.log("Endpoint Llamado!");
    
    return { message: "webhook handler!!!" }
  }
}
