import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import SectionPage from "./pages/SectionPage";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/bugs"><SectionPage section="bugs" /></Route>
    <Route path="/lab"><SectionPage section="lab" /></Route>
    <Route path="/about"><SectionPage section="about" /></Route>
    <Route><Home /></Route>
  </Switch>;
}
