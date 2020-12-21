import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup/index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route>404 NOT FOUND PAGE</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
