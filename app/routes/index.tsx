import { createFileRoute } from "@tanstack/react-router";
import { setCookie } from "vinxi/http";

export const Route = createFileRoute("/")({
  component: Home,
  loader() {
    console.info("Loading Home...");
    setCookie("cookie-name", "cookie-value-1");
    setCookie("cookie-name", "cookie-value-2");
    setCookie("cookie-name", "cookie-value-3");
    setCookie("cookie-name", "cookie-value-4");
    setCookie("cookie-name", "cookie-value-5");
    setCookie("cookie-name", "cookie-value-6");
  },
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
    </div>
  )
}
