
export abstract class DiscordBot {
  private static discordWebhookURL = Bun.env.DISCORD_WEBHOOK_URL;
  
  static async notify(message: string){
    // const imageURL = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZtNGRpdHdrN25kNTRqbzZ5cTU2a2RjYnQ4cTVudGZxcnRwYno1cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/QxT6pLq6ekKiCkLkf0/giphy.gif'
    // const body = {
    //   content: message,
    //   embeds: [
    //     {
    //       image: { url: imageURL }
    //     }
    //   ]
    // }
    const body = {
      content: message
    }

    const resp = await fetch(DiscordBot.discordWebhookURL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if(!resp.ok){
      console.log('Error sending message to Discord');
      return false
    }

    return true
  }
}
