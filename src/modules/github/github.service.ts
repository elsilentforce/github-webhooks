import { Context, status } from "elysia"
import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";
import { github } from ".";
import { DiscordBot } from "../../utils";

export abstract class GithubService {
  constructor(){}

  static webhookHandler({body, headers}: Context & { body: any }){
    const event = headers['x-github-event'] ?? 'Unknown';
    // const signature = headers['x-hub-signature-256'] ?? 'Unknown';
    const { action } = body;
    let message:string = '';
    
    switch(event){
      case 'star':
        const starBody = body as GithubStarPayload;
        message = this.onStar(starBody);
        break;
      case 'issues':
        const issueBody = body as GithubIssuePayload;
        message = this.onIssue(issueBody);
        break;
      default:
        console.log(`Unknown handler for event: ${ event }`);
        break;
    }

    DiscordBot.notify(message)
      .then(() => status(202, { message: "Accepted" }))
      .catch(() => status(400, { error: "Error!" }));
  }

  static onStar(payload: GithubStarPayload): string{
    const { action, sender, repository } = payload;
    let message:string = '';

    switch(action){
      case 'created':
        message = `⭐ User ${ sender.login } ${ action } star on ${ repository.name } repository ⭐`;
        break;
      case 'deleted':
        message = `🙅‍♀️ User ${ sender.login } ${ action } star on ${ repository.name } repository 🙅‍♀️`;
        break;
      default:
        message = `Unhandled action ${action} for stars.`
        break;
    }

    return message;
  }

  static onIssue(payload: GithubIssuePayload): string{
    const { action, issue } = payload;
    let message:string = '';

    switch(action){
      case 'opened':
        message = `An issue was opened with this title '${ issue.title }'.`;
        break;
      case 'closed':
        message = `An issue was closed by ${ issue.user.login }`;
        break;
      case 'reopened':
        message = `An issue was reopened by ${ issue.user.login }`;
        break;
      default:
        message = `Unhandled 'Issue' action for event: ${action}`;
        break;
    }

    return message
  }
}
