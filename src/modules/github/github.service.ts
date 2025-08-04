import { Context, status } from "elysia"
import { GithubStarPayload } from "../../interfaces";
import { github } from ".";

export abstract class GithubService {
  constructor(){}

  static webhookHandler({body, headers}: Context & { body: any }){
    const event = headers['x-github-event'] ?? 'Unknown';
    // const signature = headers['x-hub-signature-256'] ?? 'Unknown';
    const { action } = body;
    // const githubEvent:string = body.action ?? '';
    console.log(event === 'star')
    
    switch(event){
      case 'star':
        const starBody = body as GithubStarPayload;
        console.log(this.onStar(starBody));
        break;
      default:
        console.log(`Unknown handler for event: ${ event }`);
        break;
    }

    return status(202, { message: "Accepted" });
  }

  static onStar(payload: GithubStarPayload){
    let message:string = '';
    const { action, sender, repository, starred_at } = payload;

    if(starred_at){
      message = `User ${sender.login} ${action} star on ${repository.name} repository`;
    }

    return message;
  }
}
