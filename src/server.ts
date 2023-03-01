import "dotenv/config";
import App from "./app";
import { IndexRoute } from "@modules/index";
import { validateEnv } from "@core/utils";
import UsersRoute from "@modules/users/users.route";
import AuthRoute from "@modules/auth/auth.route";
import SummaryRoute from "@modules/summaries/summaries.route";
import { SectionCVRoute } from "@modules/section_cv";

// validateEnv();

const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new SummaryRoute(),
  new SectionCVRoute(),
];

const app = new App(routes);

app.listen();
