import { Elysia } from "elysia";
import { appRoutes } from "./presentation/routes";

(()=>{
  main();
})();

function main(){
  const port = Number(Bun.env.APP_PORT);

  const app = new Elysia()
    .use(appRoutes)
    .listen(port);

  console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );

}

