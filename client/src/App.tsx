import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import SectionPage from "./pages/SectionPage";
import QuestPage from "./pages/QuestPage";
import ScenarioPage from "./pages/ScenarioPage";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/quest/:id"><QuestPage /></Route>
    <Route path="/scenario"><ScenarioPage /></Route>
    <Route path="/bugs"><SectionPage section="bugs" /></Route>
    <Route path="/lab"><SectionPage section="lab" /></Route>
    <Route path="/about"><SectionPage section="about" /></Route>
    <Route><Home /></Route>
  </Switch>;
}
