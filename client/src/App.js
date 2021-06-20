import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Auth from "./pages/Auth";
import Chat from "./pages/Chat";

function App() {

  const [auth, setAuth] = useState({username: ''})

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Chat auth={auth} setAuth={setAuth} />
        </Route>
        <Route path="/auth">
          <Auth setAuth={setAuth} auth={auth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
