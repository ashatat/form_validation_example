import "./App.css";
import { BrowserRouter, Switch, Link } from "react-router-dom";

import Route from "./Route";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import { AuthProvider } from "./auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/" protect rules={["admin", "member"]}>
            <Home />
          </Route>
          <Route exact path="/test" protect rules={["admin", "member"]}>
            <Home />
          </Route>
          <Route>
            404 NOT FOUND PAGE
            <br />
            <Link to="/">go to home</Link>
            <br />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
