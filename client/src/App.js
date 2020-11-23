import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import Dashboard from "./pages/Dashboard";
import Portal from './pages/Portal';
import { AuthProvider } from "./utils/useAuthContext";
import { DashboardProvider } from "./utils/useDashboardContext";

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Nav />
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/portal">
              <Portal />
            </Route>
          </Switch>
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
