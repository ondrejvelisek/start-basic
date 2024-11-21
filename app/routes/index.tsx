import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { setCookie } from "vinxi/http";

const serverCookie = createServerFn().handler(async () => {
  console.info(`Adding cookie`);
  setCookie("cookie-name", "cookie-value-1");
  setCookie("cookie-name", "cookie-value-2");
  setCookie("cookie-name", "cookie-value-3");
  setCookie("cookie-name", "cookie-value-4");
});

export const Route = createFileRoute("/")({
  component: Home,
  async loader() {
    console.info("Loading Home...");
    await serverCookie();

    if (import.meta.env.SSR) {
      setCookie("cookie-name-2", "cookie-value-1");
      setCookie("cookie-name-2", "cookie-value-2");
      setCookie("cookie-name-2", "cookie-value-3");
      setCookie("cookie-name-2", "cookie-value-4");
    }
  },
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
    </div>
  );
}
