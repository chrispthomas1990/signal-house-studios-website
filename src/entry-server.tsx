import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";

export function render(pathname: string) {
  return renderToString(<StaticRouter location={pathname} basename={import.meta.env.BASE_URL}><AppRoutes /></StaticRouter>);
}
