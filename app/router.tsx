import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { createServerFn } from "@tanstack/start";

export const logEvent = createServerFn({ method: "POST" })
  .validator((data: string) => data)
  .handler(({ data }) => {
    console.log("logEvent BEFORE", data);
    // dont block rendering page
    (async () => {
      console.log("logEvent BEFORE1", data);
      await fetch("https://jsonplaceholder.typicode.com/posts");
      console.log("logEvent BEFORE2", data);
    })();
  });


export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  });

  router.subscribe("onBeforeLoad", async () => {
    await logEvent({ data: "event beforeLoad" });
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
