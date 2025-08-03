import { Elysia } from "elysia";
import { githubRoutes } from "./github/routes";

export const appRoutes = new Elysia()
  .group("/api", app =>
    app.group("/github", app =>
      app.use(githubRoutes)
    )
  );
